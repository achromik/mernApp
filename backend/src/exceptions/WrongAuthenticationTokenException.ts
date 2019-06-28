import { HttpException } from './HttpException';

export class WrongAuthenticationTokenException extends HttpException {
    public constructor() {
        super(401, 'Wrong authentication token');
    }
}
