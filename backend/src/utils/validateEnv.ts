import { cleanEnv, str, port } from 'envalid';

export const validateEnv = (): void => {
    cleanEnv(process.env, {
        PORT: port(),
        DATABASE_URI: str(),
        DATABASE_NAME: str(),
    });
};
