import { HttpException } from './HttpException';

export class WrongRefreshTokenException extends HttpException {
    public constructor() {
        super(401, 'Wrong refresh token');
    }
}
