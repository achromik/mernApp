import { HttpException } from './HttpException';

export class UserNotFoundException extends HttpException {
    public constructor(user?: string) {
        const message = user ? `User: ${user} not found` : `Not found`;
        super(404, message);
    }
}

export class UserAlreadyExistException extends HttpException {
    public constructor() {
        super(409, 'User already exists.');
    }
}
