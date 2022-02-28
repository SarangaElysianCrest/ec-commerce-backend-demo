import { Response } from 'express';
import * as httpStatus from 'http-status-codes';

export const SUCCESS = 'success';
export const FAIL = 'fail';
export const ERROR = 'error';

export const HttpStatus = httpStatus;

export class JSONResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public sendSuccess(data?: object, code?: number) {
    if (!code) {
      code = httpStatus.OK
    }
    const body = {
      data,
      status: SUCCESS,
    };
    this.res
      .status(code)
      .json(body)
      .end();
  }

  public sendFail(data?: object, code?: number) {
    if (!code) {
      code = httpStatus.NOT_ACCEPTABLE;
    }
    const body = {
      data,
      status: FAIL,
    };
    this.res
      .status(code)
      .json(body)
      .end();
  }

  public sendError(message: string, code?: number) {
    code = code || httpStatus.INTERNAL_SERVER_ERROR;
    const body = {
      message,
      status: ERROR,
    };
    this.res
      .status(code)
      .json(body)
      .end();
  }

  public sendUnauthorized() {
    this.sendError('Unauthorized', httpStatus.UNAUTHORIZED);
  }

  public sendBadRequest() {
    this.sendError('Bad Request', httpStatus.BAD_REQUEST);
  }

  public sendNotFound() {
    this.sendError('Not Found', httpStatus.NOT_FOUND);
  }

  public sendInternalServerError() {
    this.sendError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR);
  }
}
