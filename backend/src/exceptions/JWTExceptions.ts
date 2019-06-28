import { HttpException } from './HttpException';

export class JWTExpiredException extends HttpException {
    public constructor() {
        super(401, 'Token expired');
    }
}
