import { Container } from 'typedi';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { LoginDto } from '@data/dtos/auth/login.dto';
import { SignupDto } from '@data/dtos/auth/signup.dto';
import { AuthService } from '@data/services/auth.service';
import { JWT_SECRET, SECRET_KEY, SECRET_KEY_HEADER } from '@config/environments';
import { AuthSignupUsecase } from '@domain/usecases/auth/signup_by_email';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { JsonController, Body, Post, UseBefore, HttpCode, Req, Res } from 'routing-controllers';
import { HeaderValidationMiddleware } from '@infrastructure/middlewares/header_validation.middleware';

@JsonController('/auth')
export class AuthController {
  public authSignUpUseCase = Container.get(AuthSignupUsecase);
  public authServices = Container.get(AuthService);

  @Post('/signup')
  @UseBefore(HeaderValidationMiddleware(SECRET_KEY, 'Secret Key does not exist', SECRET_KEY_HEADER))
  @UseBefore(ValidationMiddleware(SignupDto))
  @HttpCode(201)
  async signUpByEmail(@Body() userData: SignupDto) {
    return await this.authSignUpUseCase.call(userData);
  }

  @Post('/login')
  @UseBefore(ValidationMiddleware(LoginDto))
  @HttpCode(200)
  async login(@Req() req: any, @Res() res: any) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', { session: true }, (err, user) => {
        if (err || !user) {
          return reject({ message: 'Invalid credentials' });
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return reject({ message: 'Login error' });
          }

          const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });

          resolve({ token });
        });
      })(req, res);
    });
  }
}
