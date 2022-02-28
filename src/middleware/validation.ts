import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import { JSONResponse } from "../lib/jsonResponse";
import context from "../lib/context";


export function ValidationHelperMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    context.logger.warn(JSON.stringify(errors.array()));
    const resp = new JSONResponse(res);
    return resp.sendError(`${errors.array({ onlyFirstError: true })[0].msg}`, 400);
  }
  next();
}