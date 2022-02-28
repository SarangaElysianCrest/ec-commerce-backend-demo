import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import {
  CreateReviewDto,
  UpdateReviewDto,
  DeleteReviewDto,
  QueryReviewDto,
  ReviewResponseDto,
  QueryReviewJoinDto
} from "../dto/review.dto";
import * as reviewService from '../service/review.service';
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import {QueryProductsDto} from "../dto/product.dto";
import * as productService from "../service/product.service";

const router = Router();

// POST /review/ <- create a review     
router.post("/", [
    body("message").exists().isString(),
    body("rating").exists().isInt(),
    body("status").exists().isInt(),
    body("like").exists().isInt(),
    body("dislike").exists().isInt(),
    body("userId").exists().isString().withMessage("invalid user id"),
    body("productId").exists().isInt().withMessage("invalid product id")
  ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const createReviewDto = req.body as CreateReviewDto;
    try {
      const response = await reviewService.createReview(createReviewDto);
      new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
    } catch (e) {
      next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  });
  

  // PUT /review/{id} <- update review details

// router.put("/:id", [
//   param("id").exists().isInt().withMessage("invalid id"),
//   body("message").exists().isString(),
//   body("rating").exists().isInt(),
//   body("status").exists().isInt(),
//   body("like").exists().isInt(),
//   body("dislike").exists().isInt(),
//   body("userId").exists().isString(),
//   body("productId").exists().isInt()
// ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//   const updateReviewDto = req.body as UpdateReviewDto;
//   updateReviewDto.id = parseInt(req.params.id);
//   try {
//     const response = await reviewService.updateReview(updateReviewDto);
//     new JSONResponse(res).sendSuccess(response, httpStatus.OK);
//   } catch (e) {
//     next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
//   }
// });


// PUT /review/likes/{id} <- update review likes and dislikes details
//   router.put("/like/:id", [
//     param("id").exists().isInt().withMessage("invalid id"),
//     body("like").exists().isInt(),
//     body("dislike").exists().isInt(),
//   ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//     const updateReviewDto = req.body as UpdateReviewDto;
//     updateReviewDto.id = parseInt(req.params.id);
//     try {
//       const response = await reviewService.updateReview(updateReviewDto);
//       new JSONResponse(res).sendSuccess(response, httpStatus.OK);
//     } catch (e) {
//       next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
//     }
//   });
//

// DELETE /review/{id} <- delete review
// router.delete("/:id", [
//   param("id").exists().isInt().withMessage("invalid id")
// ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//   const deleteReviewDto = { id: parseInt(req.params.id) } as DeleteReviewDto;
//   try {
//     await reviewService.deleteReview(deleteReviewDto);
//     new JSONResponse(res).sendSuccess({}, httpStatus.OK);
//   } catch (e) {
//     next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
//   }
// });



// GET /review/query <- list reviews (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as  QueryReviewDto;
    const response = await reviewService.queryReview(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


// GET /review/{id} <- get single review
// router.get("/:id", [
//   param("id").exists().isInt().withMessage("invalid id")
// ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const response = await reviewService.getReviewById(parseInt(req.params.id));
//     new JSONResponse(res).sendSuccess(response, httpStatus.OK);
//   } catch (e) {
//     next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
//   }
// });


// GET /review/query <- list reviews (optional querying capabilities)
router.get("/product/:id", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as  QueryReviewDto;
    param("id").exists().isInt().withMessage("invalid id")
    const response = await reviewService.queryReviewByProductId(req.params.id);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


// GET /review/query <- list reviews (optional querying capabilities)
router.post("/queryjoin/:id", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    body("userId").exists().isString()
    param("id").exists().isInt().withMessage("invalid id")
    const queryDto = {} as  QueryReviewDto;
    const queryReviewDto = req.body as QueryReviewJoinDto;
    queryReviewDto.id = parseInt(req.params.id);
    // console.log("body "+queryReviewDto.userId)
    let userId = queryReviewDto.userId;
    const response = await reviewService.queryReviewJoin(parseInt(req.params.id),userId);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


export default router;