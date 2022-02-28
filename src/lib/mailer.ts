import { createConnection } from "typeorm";
import logger from "./logger";
import { DB } from "../db";

const domain = "elysiancrest.lk";

export const FROM_SUPPORT = "support@" + domain;
export const FROM_CONTACT = "contact@" + domain;
export const FROM_NO_REPLY = "no-reply@" + domain;

export class Mailer {
  public send(from: string, to: string, subject: string, text: string): Promise<void> {
    const data = {
      from,
      subject,
      text,
      to
    };
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public supportSend(to: string, subject: string, text: string): Promise<void> {
    return this.send(FROM_SUPPORT, to, subject, text);
  }

  public contactSend(to: string, subject: string, text: string): Promise<void> {
    return this.send(FROM_CONTACT, to, subject, text);
  }

  public noReplySend(to: string, subject: string, text: string): Promise<void> {
    return this.send(FROM_NO_REPLY, to, subject, text);
  }
}

let mailer: Mailer | null = null;

export function getMailer(): Mailer {
  return mailer!;
}

export function initMailer(): Promise<Mailer> {
  return new Promise((resolve, reject) => {
    mailer = new Mailer();
    return resolve(mailer);
  });
}
