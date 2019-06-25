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
    private secretKey = process.env.SECRET_KEY as string;
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
                .then(user => {
                    if (user && bcrypt.compareSync(req.body.password, user.password)) {
                        const payload = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        };

                        const token = jwt.sign(payload, this.secretKey, {
                            expiresIn: 1440,
                        });

                        res.status(200).json({ token });
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
        const today = new Date();

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            created: today,
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
