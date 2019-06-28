import { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    // tslint:disable-next-line: no-console
    console.log(`${request.method} ${request.path}`);
    next();
};
