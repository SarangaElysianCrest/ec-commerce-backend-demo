import { getLogger } from './logger';

import * as dotenv from 'dotenv';

const APP_SECRET = 'APP_SECRET';
const APP_TOKEN_ISSUER = "APP_TOKEN_ISSUER";
const APP_SALT_ROUNDS = 'APP_SALT_ROUNDS';
const APP_DATA_FOLDER = 'APP_DATA_FOLDER';

const TYPEORM_CONNECTION = 'TYPEORM_CONNECTION';
const TYPEORM_HOST = 'TYPEORM_HOST';
const TYPEORM_USERNAME = 'TYPEORM_USERNAME';
const TYPEORM_PASSWORD = 'TYPEORM_PASSWORD';
const TYPEORM_DATABASE = 'TYPEORM_DATABASE';
const TYPEORM_PORT = 'TYPEORM_PORT';

const logger = getLogger();

dotenv.config();

function envVarToInt(key: string, defaultVal?: number): number {
  let envVal = process.env[key];
  if (envVal === undefined) {
    envVal = `${defaultVal || ''}`;
  }
  const r = parseInt(envVal, 10);
  if (!isNaN(r)) {
    return r;
  }
  logger.error(`environment varialbe ${key} not found`);
  process.exit(1);
  return -1;
}

function envVarToStr(key: string, defaultVal?: string): string {
  const envVal = process.env[key];
  if (envVal === undefined && defaultVal === undefined) {
    logger.error(`environment varialbe ${key} not found`);
    process.exit(1);
    return '';
  }
  return `${envVal || defaultVal}`;
}

const config = {
  APP_DATA_FOLDER: envVarToStr(APP_DATA_FOLDER),
  APP_HOST: '0.0.0.0',
  APP_PORT: 8080,
  APP_SALT_ROUNDS: envVarToInt(APP_SALT_ROUNDS),
  APP_SECRET: envVarToStr(APP_SECRET),
  APP_TOKEN_ISSUER: envVarToStr(APP_TOKEN_ISSUER, "app"),

  TYPEORM_CONNECTION: envVarToStr(TYPEORM_CONNECTION),
  TYPEORM_DATABASE: envVarToStr(TYPEORM_DATABASE),
  TYPEORM_HOST: envVarToStr(TYPEORM_HOST),
  TYPEORM_PASSWORD: envVarToStr(TYPEORM_PASSWORD),
  TYPEORM_PORT: envVarToInt(TYPEORM_PORT),
  TYPEORM_USERNAME: envVarToStr(TYPEORM_USERNAME)
};

logger.info('initiating config');

export default config;
