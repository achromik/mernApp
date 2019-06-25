import { HttpException } from './HttpException';

export class InvalidCredentialsException extends HttpException {
    public constructor() {
        super(400, 'Invalid username or/and password.');
    }
}
