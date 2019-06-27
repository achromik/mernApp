import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { Controller } from '../interfaces/controller.interface';
import userModel from './user.model';
import { UserNotFoundException } from '../exceptions/UserExceptions';
import { JWTExpiredException } from '../exceptions/JWTExceptions';
import { InternalErrorException } from '../exceptions/InternalErrorException';
import { authMiddleware } from '../middleware/auth.middleware';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';

export class UsersController implements Controller {
    public readonly path = '/users';
    public router = express.Router();
    private secretKey = process.env.JWT_SECRET_KEY as string;
    private refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY as string;
    private user = userModel;

    public constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(`${this.path}/profile`, authMiddleware, this.getUserProfile);
    }

    private getUserProfile = async (
        req: RequestWithUser,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const token = req.headers.authorization as string;
        try {
            const decode = jwt.verify(token, this.secretKey) as { _id: string };
            console.log(req.user);
            const user = await this.user.findById(decode._id);
            if (user) {
                res.status(200).json(user);
            } else {
                next(new UserNotFoundException(decode._id));
            }
        } catch (err) {
            this.handleTokenExpiredError(err, next);
        }
    };

    private handleTokenExpiredError = (err: Error, next: express.NextFunction): void => {
        err.name === 'TokenExpiredError'
            ? next(new JWTExpiredException())
            : next(new InternalErrorException(err.name));
    };
}
