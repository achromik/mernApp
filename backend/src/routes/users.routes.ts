import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import User from '../users/user.model';

const users = express.Router();
users.use(cors());

const secretKey = process.env.SECRET_KEY || 'secret';

users.post('/register', (req, res) => {
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
                            res.json({ status: user.email + ' registered!' });
                        })
                        .catch(err => {
                            res.json({ error: err });
                        });
                });
            } else {
                throw { name: 'User already exists' };
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

users.post('/login', (req, res) => {
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
                res.send(token);
            } else {
                throw { name: 'Invalid username or/and password' };
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

users.get('/profile', (req, res) => {
    const token = req.headers.authorization || '';
    try {
        const decode = jwt.verify(token, secretKey) as { _id: string };

        User.findById(decode._id)
            .then(user => {
                if (user) {
                    res.json(user);
                } else {
                    throw { name: 'User does not exist' };
                }
            })
            .catch(err => {
                res.json({ error: err });
            });
    } catch (err) {
        res.json({ error: err });
    }
});

export default users;
