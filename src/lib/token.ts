import context from "./context";
import { User } from "../db/entity/user";
import moment from "moment";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import config from "./config";
import { LessThanOrEqual, MoreThan } from "typeorm";
import { hash } from "./hash";

export const EXPIRY_USER_ACCESS_TOKEN = 60 * 60;
export const EXPIRY_USER_REFRESH_TOKEN = 60 * 60 * 24 * 7;

export const EXPIRY_USER_PWD_TOKEN = 3 * 60 * 60;

export const enum TokenType {
  TOKEN_ACCESS = "a",
  TOKEN_PWD_RESET = "p",
  TOKEN_REFRESH = "r"
}

interface IAccessToken {
  userId: string;
}

interface IPasswordResetToken {
  userId: string;
}

async function addToken(token: string, userId: string, type: TokenType, expiresIn: number) {
  const expiresAt = moment().add(expiresIn, 'seconds').toDate();
  return await context.db.sysTokenRepository.insert({
    token: hash(token),
    userId,
    type,
    expiresAt
  });
}

async function getToken(token: string, type: TokenType) {
  const te = await context.db.sysTokenRepository.findOne({ token: hash(token), type, expiresAt: MoreThan(new Date()) });
  if (!te) throw new Error("Token Not Found!");
  if (moment(te.expiresAt).isAfter(moment())) {
    return te;
  }
  await context.db.sysTokenRepository.remove(te);
  throw new Error("Token Expired!");
}

async function cleanTokens() {
  await context.db.sysTokenRepository.delete({
    expiresAt: LessThanOrEqual(new Date())
  })
}

export async function createUserAccessToken(user: User) {

  const payload : IAccessToken = {
    userId: user.uid
  }

  return jwt.sign(
    payload,
    config.APP_TOKEN_ISSUER,
    {
      expiresIn: EXPIRY_USER_ACCESS_TOKEN
    }
  )
}

export async function createRefreshToken(user: User) {
  while (true) {
    try {
      const rnd = randomstring.generate({ charset: 'alphanumeric', length: 36 });
      await addToken(rnd, user.uid, TokenType.TOKEN_REFRESH, EXPIRY_USER_REFRESH_TOKEN);
      return rnd;
    } catch (e) {
      context.logger.warn("Retrying to Create a refresh token");
    }
  }
}

export async function createPasswordResetToken(user: User) {
  const payload : IPasswordResetToken = {
    userId: user.uid
  };
  const token = jwt.sign(
    payload,
    config.APP_SECRET,
    {
      expiresIn: EXPIRY_USER_PWD_TOKEN,
      issuer: config.APP_TOKEN_ISSUER,
    },
  );

  await addToken(token, user.uid, TokenType.TOKEN_PWD_RESET, EXPIRY_USER_PWD_TOKEN);

  return token;
}

export function parseAccessToken(token: string) {
  try {
    const obj = jwt.verify(token, config.APP_SECRET, {
      issuer: config.APP_TOKEN_ISSUER,
    });
    if (typeof obj === 'string') {
      return null;
    }
    return obj as IAccessToken;
  } catch (e) {
    return null;
  }
}

export async function parseRefreshToken(token: string) {
  try {
    return await getToken(token, TokenType.TOKEN_REFRESH);
  } catch (e) {
    return null;
  }
}

export async function parsePasswordToken(token: string) {
  try {
    const obj = jwt.verify(token, config.APP_SECRET, {
      issuer: config.APP_TOKEN_ISSUER,
    });
    if (typeof obj === 'string') {
      return null;
    }
    const tokenData = obj as IPasswordResetToken;

    const te = await getToken(token, TokenType.TOKEN_PWD_RESET);
    await context.db.sysTokenRepository.remove(te);

    return tokenData;
  } catch (e) {
    return null;
  }
}
