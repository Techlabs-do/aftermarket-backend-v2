import { App } from './app';
import { ValidateEnv } from '@infrastructure/common/validateEnv';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { CustomerController } from '@infrastructure/controllers/customers.controller';
import { UserController } from '@infrastructure/controllers/users.controller';
import { VendorController } from '@infrastructure/controllers/vendors.controller';

ValidateEnv();

const app = new App([UserController, AuthController, CustomerController, VendorController]);

app.listen();
