import { NextFunction, Request, Response } from "express";
import { hasPermission } from "../lib/permission";

// Sample function to do in aws amplify
export  async function getTokenData(token: string) {
  return Promise.resolve({
    userId: '12345',
    role: 'Admin',
    permissions: ['work', 'add', 'edit']
  });
}

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
  } else {

    const tokenData = await getTokenData(accessToken);

    if (!tokenData) {
      return next(new Error("permission denied"));

    }

    res.locals.userId = tokenData.userId;
    res.locals.role = tokenData.role;
    res.locals.permissions = tokenData.permissions;
  }

  next();
}



/**
* Check if the token has the appropriate permission
*
* @param permission the permission to check against
*/
export async function AuthAllowPermissionMiddleware(permissions: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.permissions) {
      return next(new Error("No Auth Permission!"));
    }

    const permission = res.locals.permissions;


    if (!hasPermission(permission, permission)) {
      return next(new Error("Permission Denied!"));
    }

    return next();
  }
}


