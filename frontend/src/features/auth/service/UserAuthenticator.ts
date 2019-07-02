import { Http } from '@src/services/Http';

import { Credentials, JWTTokenData, RegistrationData } from '@src/features/auth/models/auth';

interface HttpServiceError {
    code: number;
    name: string;
    message: string;
    body: {
        message: string;
    };
}
export class UserAuthenticator {
    constructor(private http: Http) {}

    public async login(credentials: Credentials): Promise<JWTTokenData> {
        try {
            return await this.http.POST<Credentials, JWTTokenData>('auth/login', credentials);
        } catch (error) {
            const errorMsg = this.prepareErrorMessage(error);

            return Promise.reject(new Error(errorMsg));
        }
    }

    public async createAccount(registrationData: RegistrationData): Promise<string> {
        try {
            return await this.http.POST<Credentials, string>('auth/register', registrationData);
        } catch (error) {
            const errorMsg = this.prepareErrorMessage(error, 409);

            return Promise.reject(new Error(errorMsg));
        }
    }

    public async logout(refreshToken: string): Promise<any> {
        try {
            return await this.http.POST<{ refreshToken: string }, string>('auth/logout', {
                refreshToken,
            });
        } catch (error) {
            const errorMsg = this.prepareErrorMessage(error);
            return Promise.reject(new Error(errorMsg));
        }
    }

    private prepareErrorMessage(error: HttpServiceError, statusCode: number = 400): string {
        return error.code === statusCode ? error.body.message : `${error.name}: ${error.message}`;
    }
}

interface HttpServiceError {
    code: number;
    name: string;
    message: string;
    body: {
        message: string;
    };
}
