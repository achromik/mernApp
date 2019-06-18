import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import HttpException from '../exceptions/HttpException';
import User from './user.model';

const users = express.Router();
users.use(cors());

const secretKey = process.env.SECRET_KEY || 'secret';

users.post('/register', (req, res, next) => {
    const today = new Date();

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        created: today,
    };

    User.findOne({
        email: req.body.email,
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(user => {
                            res.status(200).send(`${user.email} registered!`);
                        })
                        .catch(err => {
                            next(err);
                        });
                });
            } else {
                next(new HttpException(409, 'User already exists'));
            }
        })
        .catch(err => {
            next(err);
        });
});

users.post('/login', (req, res, next) => {
    User.findOne({
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
                const token = jwt.sign(payload, secretKey, {
                    expiresIn: 1440,
                });
                res.status(200).send({ token });
            } else {
                next(new HttpException(400, 'Invalid username or/and password.'));
            }
        })
        .catch(err => {
            next(err);
        });
});

users.get('/profile', (req, res, next) => {
    const token = req.headers.authorization || '';
    try {
        const decode = jwt.verify(token, secretKey) as { _id: string };

        User.findById(decode._id)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    next(new HttpException(404, 'User does not exist'));
                }
            })
            .catch(err => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
});

export default users;
