import { Http } from '@src/services/Http';

import { Credentials, JWTTokenData } from '@src/features/auth/models/auth';

export class UserAuthenticator {
    constructor(private http: Http) {}

    public async login(credentials: Credentials): Promise<JWTTokenData> {
        try {
            return await this.http.POST<Credentials, JWTTokenData>('users/login', credentials);
        } catch (error) {
            // const errorMsg = error.code === 400 ? error.body.message : 'Connection Error';

            return Promise.reject(new Error(error));
        }
    }
}
