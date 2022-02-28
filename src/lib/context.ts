import { DB, getDB } from '../db';
import { Mailer, getMailer } from './mailer';
import { Logger } from "winston";
import { getLogger } from "./logger";

export class Context {

  
  public get db() : DB {
    return getDB();
  }

  
  public get mailer() : Mailer {
    return getMailer();
  }

  public get logger() : Logger {
    return getLogger();
  }

}

export default new Context();