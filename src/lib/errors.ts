const codes = {
  ERR_BAD_REQUEST: 400,
  ERR_NOT_FOUND: 404,

  ERR_EMAIL_EXISTS: 0xf001,
  ERR_UNKNOWN: 0xffff,
};

export class APIError extends Error {

  readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

}
