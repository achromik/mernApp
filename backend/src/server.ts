import 'dotenv/config';

import { App } from './app';
import { UsersController } from './users/users.controller';
import { validateEnv } from './utils/validateEnv';
import { AuthenticationController } from './auth/authentication.controller';

validateEnv();

const app = new App([new UsersController(), new AuthenticationController()]);

app.listen();
