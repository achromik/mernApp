import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import usersRoute from './users/users.routes';
import errorMiddleware from './middleware/error.middleware';

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = 'mongodb://mongo:27017/mern';

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

app.use('/api/users', usersRoute);

app.use(errorMiddleware);

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })

    .then(() => {
        // tslint:disable-next-line: no-console
        console.log('MongoDB connected');
    })
    .catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
    });

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Server is running on port: ${port}`);
});
