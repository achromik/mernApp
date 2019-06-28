import { HttpException } from './HttpException';

export class UserAlreadyExistException extends HttpException {
    public constructor() {
        super(409, 'User already exists.');
    }
}
