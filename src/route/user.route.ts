import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { CreateUserDto, DeleteUserDto, QueryUsersDto, UpdateUserDto } from "../dto/user.dto";
import * as userService from "../service/user.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /user/ <- create a new user
router.post("/", [
  body("email").exists().isEmail().normalizeEmail(),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("addressLine1").optional().isString(),
  body("addressLine2").optional().isString(),
  body("city").optional().isString(),
  body("phone").optional().isString(),
  body("homePhone").optional().isString(),
  body("province").optional().isString(),
  body("postalCode").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createUserDto = req.body as CreateUserDto;
  try {
    const response = await userService.createUser(createUserDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /user/{id} <- update user details
router.put("/:id", [
  param("id").exists().isString().withMessage("invalid id"),
  body("email").exists().isEmail().normalizeEmail(),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("addressLine1").optional().isString(),
  body("addressLine2").optional().isString(),
  body("city").optional().isString(),
  body("phone").optional().isString(),
  body("homePhone").optional().isString(),
  body("province").optional().isString(),
  body("postalCode").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateUserDto = req.body as UpdateUserDto;
  updateUserDto.id = req.params.id;
  try {
    const response = await userService.updateUser(updateUserDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /user/{id} <- delete user
router.delete("/:id", [
  param("id").exists().isString().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteUserDto = { id: req.params.id } as DeleteUserDto;
  try {
    await userService.deleteUser(deleteUserDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /user/query <- list users (optional querying capabilities)
router.get("/query", [
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryUsersDto;
    if(req.query.email){
      queryDto.email = req.query.email as string;
    }
    const response = await userService.queryUsers(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /user/{id} <- get single user
router.get("/:id", [
  param("id").exists().isString().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getUserById(req.params.id);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;