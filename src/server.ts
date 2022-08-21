import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import session from "express-session";
import { config } from "dotenv";
import cors from "cors";
import ormconfig from "./ormconfig";
import metadataRouter from "./routes/metadata";
import certificateRouter from "./routes/certificate";
import authRouter from "./routes/auth";
import { DataSource } from "typeorm";
import env from "./env";
import { isOperationalError, logError } from "./utils/error/errorHandler";
import { BaseError } from "./utils/error/baseError";
import MongoStore from "connect-mongo";
import { Admin } from "./model/entity/Auth";
config();

declare module 'express-session' {
  interface Session {
    admin: Admin;
  }
}

(async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    credentials: true,
    origin: [env.clientUrl!]
  }));

  const connection = new DataSource({
    ...ormconfig
  });

  connection.initialize().then(() => {
    console.log(`Connected to mongodb`);
  }).catch(err => console.log(err));


  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: env.dbHost,
      }),
      // cookie: { secure: false },
    })
  );

  app.use("/metadata", metadataRouter);
  app.use("/certificate", certificateRouter);
  app.use("/auth", authRouter);

  app.use((err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode ? err.statusCode : 500).json({ status: false, message: err.name ? err.name : "Something went wrong!" })
  })

  app.listen(env.port, () => console.log(`Listening on port ${env.port}`));

  process.on('unhandledRejection', error => {
    throw error
  })

  process.on('uncaughtException', (error: BaseError) => {
    logError(error)

    if (!isOperationalError(error)) {
      process.exit(1)
    }
  })

})();
