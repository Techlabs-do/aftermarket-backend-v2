import { App } from './app';
import { ValidateEnv } from '@infrastructure/common/validateEnv';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { CustomerController } from '@infrastructure/controllers/customers.controller';
import { OptionsController } from '@infrastructure/controllers/options.controller';
import { ProductController } from '@infrastructure/controllers/product.controller';
import { RegionsController } from '@infrastructure/controllers/regions.controller';
import { UserController } from '@infrastructure/controllers/users.controller';
import { VendorController } from '@infrastructure/controllers/vendors.controller';

ValidateEnv();

const app = new App([UserController, AuthController, CustomerController, VendorController, ProductController, RegionsController, OptionsController]);

app.listen();
