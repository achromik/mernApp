import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Controller } from '../interfaces/controller.interface';
import userModel from './user.model';
import { UserNotFoundException, UserAlreadyExistException } from '../exceptions/UserExceptions';
import { JWTExpiredException } from '../exceptions/JWTExceptions';
import { InvalidCredentialsException } from '../exceptions/AuthorizationExceptions';
import { InternalErrorException } from '../exceptions/InternalErrorException';

export class UsersController implements Controller {
    public path = '/users';
    public router = express.Router();
    private secretKey = process.env.JWT_SECRET_KEY as string;
    private refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY as string;
    private user = userModel;

    public constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.post(`${this.path}/login`, this.signInUser);
        this.router.get(`${this.path}/profile`, this.getUserProfile);
        this.router.post(`${this.path}/register`, this.registerUser);
    }

    private getUserProfile = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const token = req.headers.authorization || '';
        try {
            const decode = jwt.verify(token, this.secretKey) as { _id: string };

            this.user.findById(decode._id).then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    next(new UserNotFoundException(decode._id));
                }
            });
        } catch (err) {
            err.name === 'TokenExpiredError'
                ? next(new JWTExpiredException())
                : next(new InternalErrorException(err.name));
        }
    };

    private signInUser = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            this.user
                .findOne({
                    email: req.body.email,
                })
                .then(async user => {
                    if (user && bcrypt.compareSync(req.body.password, user.password)) {
                        const payload = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        };

                        const token = await jwt.sign(payload, this.secretKey, {
                            expiresIn: '1m',
                        });

                        const refreshToken = await jwt.sign(
                            { userID: user._id },
                            this.refreshSecretKey,
                            {
                                expiresIn: '2d',
                            },
                        );

                        const updatedUser = await this.user.updateOne(
                            { _id: user._id },
                            { refreshToken: refreshToken, status: true },
                        );

                        res.status(200).json({ token, refreshToken, updatedUser });
                    } else {
                        next(new InvalidCredentialsException());
                    }
                });
        } catch (err) {
            next(new InternalErrorException(err.name));
        }
    };

    private registerUser = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const userData = {
            ...req.body,
        };
        try {
            this.user
                .findOne({
                    email: req.body.email,
                })
                .then(user => {
                    if (!user) {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            userData.password = hash;
                            this.user.create(userData).then(user => {
                                res.status(200).json(user);
                            });
                        });
                    } else {
                        next(new UserAlreadyExistException());
                    }
                });
        } catch (err) {
            next(new InternalErrorException(err.name));
        }
    };
}
