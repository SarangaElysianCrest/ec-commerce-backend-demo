import "reflect-metadata";

import express, { Express, NextFunction, Request, Response } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import { initDB } from "./db";
import { JSONResponse } from "./lib/jsonResponse";
import route from "./route";
import { getLogger, initLogger } from "./lib/logger";
import { initMailer } from "./lib/mailer";
import { APIError } from "./lib/errors";
import seedData from "./seedData";

class App {
  public readonly app: Express = express();

  constructor() {
    initLogger().then(() => {
      return initMailer();
    }).then(() => {
      return initDB();
    }).then(() => {
      return seedData();
    }).then(() => {
      this.initApp();
    }).catch(err => {
      getLogger().error(err);
      process.exit(1);
    });
  }

  private initApp() {
    this.setup3rdPartyMiddleware();

    this.setupCustomMiddleware();

    this.setupRoutes();

    this.setupErrorHandlers();
  }

  private setup3rdPartyMiddleware() {
    // logger
    this.app.use(morgan("dev"));

    // body parser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // cors
    this.app.use(cors());
  }

  private setupCustomMiddleware() {
    // TODO.md: XXX
  }

  private setupRoutes() {
    this.app.use(route);
  }

  /**
   * Setup Error Handlers for the express pipeline
   */
  private setupErrorHandlers() {
    // 404 handler
    this.app.use((req, res) => {
      new JSONResponse(res).sendNotFound();
    });

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.stack !== undefined) {
        getLogger().error(err.stack);
      }
      next(err);
    });

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      getLogger().error(err);
      if (err instanceof APIError) {
        return new JSONResponse(res).sendError(err.message, err.code);
      }
      return new JSONResponse(res).sendInternalServerError();
    });
  }
}

export default new App().app;
