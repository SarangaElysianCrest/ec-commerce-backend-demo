import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { CreateProductImageDto, DeleteProductImageDto, QueryProductImagesDto, UpdateProductImageDto } from "../dto/productImage.dto";
import * as productImageService from "../service/productImage.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /product/image/ <- create a productImage
router.post("/", [
  body("url").exists().isString(),
  body("productId").exists().isInt().withMessage("invalid product id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createProductImageDto = req.body as CreateProductImageDto;
  try {
    const response = await productImageService.createProductImage(createProductImageDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /product/image/{id} <- update productImage details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("url").optional().isString(),
  body("productId").exists().isInt().withMessage("invalid product id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateProductImageDto = req.body as UpdateProductImageDto;
  updateProductImageDto.id = parseInt(req.params.id);
  try {
    const response = await productImageService.updateProductImage(updateProductImageDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /product/image/{id} <- delete productImage
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteProductImageDto = { id: parseInt(req.params.id) } as DeleteProductImageDto;
  try {
    await productImageService.deleteProductImage(deleteProductImageDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/image/query <- list productImages (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryProductImagesDto;
    const response = await productImageService.queryProductImages(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/image/{id} <- get single productImage
router.get("/:id", [param("id").exists().isInt().withMessage("invalid id")], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await productImageService.getProductImageById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;