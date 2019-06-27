import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as lodash from 'lodash';

import { Controller } from '../interfaces/controller.interface';
import userModel from '../users/user.model';
import { InternalErrorException } from '../exceptions/InternalErrorException';
import { UserAlreadyExistException } from '../exceptions/UserAlreadyExistException';
import { InvalidCredentialsException } from '../exceptions/AuthorizationExceptions';
import User from '../users/user.interface';
import { DataStoredInToken } from '../interfaces/dataStoredInToken.interface';
import { DataStoredInRefreshToken } from '../interfaces/dataStoredInRefreshToken';

export class AuthenticationController implements Controller {
    public readonly path = '/auth';
    public router = express.Router();
    private user = userModel;
    private secretKey = process.env.JWT_SECRET_KEY as string;
    private refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY as string;

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
        this.router.post(`${this.path}/refreshToken`, this.refreshToken);
    }

    private createToken = async (user: User): Promise<string> => {
        const expiresIn = 60 * 5; //5 minutes
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        return await jwt.sign(dataStoredInToken, this.secretKey, { expiresIn });
    };

    private createRefreshToken = async (userId: string): Promise<string> => {
        const expiresIn = '7d';
        const dataStoredInToken: DataStoredInRefreshToken = {
            _id: userId,
        };

        return await jwt.sign(dataStoredInToken, this.refreshSecretKey, { expiresIn });
    };

    private registration = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const userData = {
            ...req.body,
        };
        try {
            const user = await this.user.findOne({
                email: req.body.email,
            });

            if (!user) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const createdUser = await this.user.create({
                    ...userData,
                    password: hashedPassword,
                });
                const userWithoutPasswordField = lodash.omit(createdUser.toObject(), ['password']);

                res.status(200).json(userWithoutPasswordField);
            } else {
                next(new UserAlreadyExistException());
            }
        } catch (err) {
            next(new InternalErrorException(`${err.name}: ${err.message}`));
        }
    };

    private loggingIn = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            const user = await this.user.findOne({
                email: req.body.email,
            });
            if (user) {
                const isPasswordMatching = await bcrypt.compareSync(
                    req.body.password,
                    user.password,
                );

                if (isPasswordMatching) {
                    const token = await this.createToken(user);

                    const refreshToken = await this.createRefreshToken(user._id);

                    await this.user.updateOne({ _id: user._id }, { refreshToken, status: true });

                    res.status(200).json({ token, refreshToken });
                } else {
                    next(new InvalidCredentialsException());
                }
            } else {
                next(new InvalidCredentialsException());
            }
        } catch (err) {
            next(new InternalErrorException(err.name));
        }
    };

    private refreshToken = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        next(new Error('Not implemented yet'));
    };
}
