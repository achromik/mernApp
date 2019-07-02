import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import omit from 'lodash/omit';

import { Controller } from '../interfaces/controller.interface';
import userModel from '../users/user.model';
import { InternalErrorException } from '../exceptions/InternalErrorException';
import { UserAlreadyExistException } from '../exceptions/UserAlreadyExistException';
import { InvalidCredentialsException } from '../exceptions/AuthorizationExceptions';
import User from '../users/user.interface';
import { DataStoredInToken } from '../interfaces/dataStoredInToken.interface';
import { DataStoredInRefreshToken } from '../interfaces/dataStoredInRefreshToken';
import { WrongRefreshTokenException } from '../exceptions/WrongRefreshTokenException';
import refreshTokenModel from './refreshToken.model';
import { JWTExpiredException } from '../exceptions/JWTExceptions';

export class AuthenticationController implements Controller {
    public readonly path = '/auth';
    public router = express.Router();
    private user = userModel;
    private refreshToken = refreshTokenModel;
    private secretKey = process.env.JWT_SECRET_KEY as string;
    private refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY as string;
    private tokenLifetime = process.env.JWT_TOKEN_LIFETIME;
    private refreshTokenLifetime = process.env.JWT_REFRESH_TOKEN_LIFETIME;

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
        this.router.post(`${this.path}/refreshToken`, this.refreshingToken);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }

    private createToken = async (user: User): Promise<string> => {
        const expiresIn = this.tokenLifetime;
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        return await jwt.sign(dataStoredInToken, this.secretKey, { expiresIn });
    };

    private createRefreshToken = async (userId: string): Promise<string> => {
        const expiresIn = this.refreshTokenLifetime;
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
                const userWithoutPasswordField = omit(createdUser.toObject(), ['password']);

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

                    await this.refreshToken.updateOne(
                        { value: refreshToken },
                        { value: refreshToken, userId: user._id },
                        { upsert: true },
                    );

                    res.status(200).json({ token, refreshToken });
                } else {
                    next(new InvalidCredentialsException());
                }
            } else {
                next(new InvalidCredentialsException());
            }
        } catch (err) {
            next(new InternalErrorException(err.name + ': ' + err.message));
        }
    };

    private refreshingToken = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            const storedToken = await this.refreshToken.findOneAndDelete({
                value: req.body.refreshToken,
            });

            if (storedToken) {
                const isTokenMatch = this.compareTokens(storedToken.value, req.body.refreshToken);

                const verifyToken = jwt.verify(
                    req.body.refreshToken,
                    this.refreshSecretKey,
                ) as DataStoredInRefreshToken;

                const user = await this.user.findOne({
                    _id: verifyToken._id,
                });

                if (isTokenMatch && user) {
                    const token = await this.createToken(user);
                    const refreshToken = await this.createRefreshToken(user._id);

                    await this.refreshToken.updateOne(
                        { value: refreshToken },
                        { value: refreshToken, userId: user._id },
                        { upsert: true },
                    );

                    res.status(200).send({ token, refreshToken });
                } else {
                    next(new WrongRefreshTokenException());
                }
            } else {
                next(new WrongRefreshTokenException());
            }
        } catch (err) {
            next(this.handleRefreshTokenExpiredError(err));
        }
    };

    private loggingOut = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            await this.refreshToken.findOneAndDelete({
                value: req.body.refreshToken,
            });
            res.status(200).send({ message: 'Logged out' });
        } catch (err) {
            next(new Error('not yet implemented'));
        }
    };

    private compareTokens = (firstToken: string, secondToken: string): boolean => {
        return firstToken === secondToken;
    };

    private handleRefreshTokenExpiredError = (
        err: Error,
    ): InternalErrorException | JWTExpiredException => {
        return err.name === 'TokenExpiredError'
            ? new JWTExpiredException()
            : new InternalErrorException(err.name);
    };
}
