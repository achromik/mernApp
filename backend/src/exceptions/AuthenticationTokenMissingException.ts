import { HttpException } from './HttpException';

export class AuthenticationTokenMissingException extends HttpException {
    public constructor() {
        super(401, 'Authentication token missing');
    }
}
