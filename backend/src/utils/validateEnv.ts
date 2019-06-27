import { cleanEnv, str, port } from 'envalid';

export const validateEnv = (): void => {
    cleanEnv(process.env, {
        PORT: port(),
        DATABASE_URI: str(),
        DATABASE_NAME: str(),
        JWT_SECRET_KEY: str(),
        JWT_REFRESH_SECRET_KEY: str(),
        JWT_TOKEN_LIFETIME: str(),
        JWT_REFRESH_TOKEN_LIFETIME: str(),
    });
};
