import { NextFunction, Request, Response } from "express";
import { hasPermission } from "../lib/permission";
import * as token from "../lib/token";
import { Context } from "../lib/context";

/**
 * Check the incoming request for an access token
 *
 * @param req express request
 * @param res express response
 * @param next express nextFunction
 */
export async function AuthAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return next(new Error("permission denied"));
  }

  const tokenData = token.parseAccessToken(accessToken);
  if (!tokenData) {
    return next(new Error("permission denied"));
  }

  res.locals.userId = tokenData.userId;

  next();
}

/**
 * Check if the token is for a given type of user
 *
 * @param userTypes list of allowed users 'admin', 'user', ...
 */
export function AuthAllowUserTypeMiddleware(...userTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (userTypes.indexOf(res.locals.userType) === -1) {
      return next(new Error("user type not allowed!"));
    } else {
      return next();
    }
  };
}

/**
 * Fetch the token user from the database and place it in res.local.admin or res.local.user
 *
 * @param context Context object
 */
export function AuthFetchUserMiddleware(context: Context) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.userId) {
      return next(new Error("user id not found!"));
    }
    const user = await context.db.userRepository
      .findOne(res.locals.userId);
    if (!user) {
      return next(new Error("user not found!"));
    }
    res.locals.user = user;
    next();
  };
}

/**
 * Check if the token has the appropriate permission
 *
 * @param permission the permission to check against
 */
export function AuthAllowPermissionMiddleware(permission: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.userPermission) {
      return next(new Error("No Auth Permission!"));
    }

    const perm = res.locals.userPermission as number;

    if (!hasPermission(perm, permission)) {
      return next(new Error("Permission Denied!"));
    }

    return next();
  };
}
