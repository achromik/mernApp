import { Http } from '@src/services/Http';
import { UserAuthenticator } from '@src/features/auth/service/UserAuthenticator';

export const httpService = new Http();
export const userAuthenticator = new UserAuthenticator(httpService);
