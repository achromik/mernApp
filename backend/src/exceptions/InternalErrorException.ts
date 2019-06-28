import { HttpException } from './HttpException';

export class InternalErrorException extends HttpException {
    public constructor(message: string) {
        super(500, message);
    }
}
