import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { DataStoredInToken } from '../interfaces/dataStoredInToken.interface';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';
import userModel from '../users/user.model';
import { WrongAuthenticationTokenException } from '../exceptions/WrongAuthenticationTokenException';
import { AuthenticationTokenMissingException } from '../exceptions/AuthenticationTokenMissingException';

export const authMiddleware = async (
    request: RequestWithUser,
    _response: Response,
    next: NextFunction,
): Promise<void> => {
    const headers = request.headers;
    if (headers && headers.authorization) {
        const secret = process.env.JWT_SECRET_KEY as string;
        try {
            const verificationResponse = jwt.verify(
                headers.authorization,
                secret,
            ) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
};
