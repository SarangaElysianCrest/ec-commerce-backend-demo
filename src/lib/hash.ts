import config from './config';

import bcrypt from 'bcrypt';

export function hash(val: string) {
  return bcrypt.hashSync(val, config.APP_SALT_ROUNDS);
}

export function compare(val: string, hash: string) {
  return bcrypt.compareSync(val, hash);
}
