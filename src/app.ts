import express, { Application } from 'express';
import morgan from 'morgan';
import { Server } from 'http';
import { useContainer, useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import { join } from 'path';
import bodyParser from 'body-parser';
import { GlobalErrorHandler } from 'middleware/global-error.handler';
import { AuthorizationHandler } from 'middleware/authorization.handler';
import { IS_DEV, MONGO_URI } from 'config';
import cors from 'cors';
import mongoose from 'mongoose';

export class App {
  public app: Application;
  public server: Server;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.setMiddleWare();
  }

  public async initServer() {
    await new Promise((resolve) => {
      this.createDatabaseConnection().then(() => {
        useContainer(Container);

        useExpressServer(this.app, {
          controllers: [join(__dirname + `/api/**/*.controller.${IS_DEV ? 'ts' : 'js'}`)],
          middlewares: [GlobalErrorHandler],
          authorizationChecker: AuthorizationHandler,
          defaultErrorHandler: false,
        });

        this.server = this.app.listen(this.port, () => {
          console.log('Service Start');
          resolve(true);
        });
      });
    });
  }

  private setMiddleWare() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private async createDatabaseConnection() {
    await mongoose.connect(MONGO_URI);

    console.log('Successfully connected to mongoDB');
  }
}
