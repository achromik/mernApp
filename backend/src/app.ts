import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import { Controller } from './interfaces/controller.interface';
import { errorMiddleware } from './middleware/error.middleware';

export class App {
    public app: express.Application;

    public constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false,
            }),
        );
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => this.app.use('/api', controller.router));
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    public listen(): void {
        const port = process.env.PORT;
        this.app.listen(port, () =>
            // tslint:disable-next-line: no-console
            console.log(`App listening on the port ${port}`),
        );
    }

    private connectToDatabase(): void {
        const { DATABASE_URI, DATABASE_NAME } = process.env;

        mongoose.connect(`mongodb://${DATABASE_URI}/${DATABASE_NAME}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    }
}
