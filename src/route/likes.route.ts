import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import * as likeService from "../service/likes.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import {CreateLikeDto, DeleteLiketDto} from "../dto/likes.dto";
import * as reviewService from "../service/review.service";


const router = Router();

// POST /variant/ <- create a productVariant
router.post("/", [
  body("reviewId").exists().isInt().withMessage("invalid review id"),
  body("userId").exists().isString().withMessage("invalid user id"),
  body("deleted").exists().isBoolean(),
  body("reaction").exists().isBoolean(),
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createLikeDto = req.body as CreateLikeDto;
  try {
    const response = await likeService.createLike(createLikeDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


router.delete("/delete",[
  body("reviewId").exists().isInt().withMessage("invalid review id"),
  body("userId").exists().isString().withMessage("invalid user id"),
  body("reaction").exists().isBoolean(),
],ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
  const deleteLikeDto = req.body as DeleteLiketDto;

  try {
    const response = await likeService.deleteLike(deleteLikeDto.reviewId,deleteLikeDto.userId,deleteLikeDto.reaction);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
})

export default router;