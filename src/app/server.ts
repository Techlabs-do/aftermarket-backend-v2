import { App } from './app';
import { ValidateEnv } from '@infrastructure/common/validateEnv';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { UserController } from '@infrastructure/controllers/users.controller';

ValidateEnv();

const app = new App([UserController, AuthController]);

app.listen();
