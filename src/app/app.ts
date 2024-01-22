import hpp from 'hpp';
import 'reflect-metadata';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import pkg from '../../package.json';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { logger, stream } from '@infrastructure/common/logger';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { AuthMiddleware } from '@infrastructure/middlewares/auth.middleware';
import { ErrorMiddleware } from '@infrastructure/middlewares/error.middleware';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { NODE_ENV, PORT, LOG_FORMAT, CREDENTIALS, JWT_SECRET } from '@config/environments';
import { init, Handlers, Integrations, autoDiscoverNodePerformanceMonitoringIntegrations } from '@sentry/node';
import database from '@config/database';
import expressSession from 'express-session';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import passport from 'passport';
export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public user: any;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.configurePassport();

    init({
      environment: NODE_ENV,
      sampleRate: NODE_ENV ? 1 : 0.75,
      beforeSend(event) {
        if (event.exception && event.exception.values && event.exception.values.length > 0) {
          const exception = event.exception.values[0];
          if (exception.type === 'ERROR') {
            event.tags = {
              ...event.tags,
              custom_tag: 'error_type',
            };

            event.extra = {
              ...event.extra,
              custom_tag: 'Additional information about the error',
            };
          }
        }
        return event;
      },
      integrations: [new Integrations.Http({ tracing: true }), ...autoDiscoverNodePerformanceMonitoringIntegrations()],
    });
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    this.initializeSwagger(Controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(Handlers.requestHandler());
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      bodyParser.json({
        verify: function (req: any, _, buf) {
          req.rawBody = buf;
        },
      }),
    );
    this.app.use(
      expressSession({
        secret: JWT_SECRET,
        resave: false,
        saveUninitialized: false,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private configurePassport() {
    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await database.instance.loginUsers.findFirst({
            where: { email: username },
          });

          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect username or password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }),
    );

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await database.instance.loginUsers.findFirst({
          where: { id },
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: '*',
        credentials: CREDENTIALS,
      },
      routePrefix: '/v2/api',
      controllers: controllers,
      defaultErrorHandler: false,
      authorizationChecker: AuthMiddleware,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions = {
      controllers: controllers,
      routePrefix: '/v2/api',
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        version: pkg.version,
        title: `AfterMarket - ENV: ${NODE_ENV}`,
        description: 'AfterMarket Backend API generated with `routing-controllers-openapi`',
      },
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(Handlers.errorHandler());
    this.app.use(ErrorMiddleware);
  }
}
