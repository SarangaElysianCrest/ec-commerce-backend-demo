import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import {
  AddVariantAttributeDto,
  CreateVariantDto,
  DeleteVariantDto,
  QueryVariantsDto, RemoveVariantAttributeDto,
  UpdateVariantDto
} from "../dto/variant.dto";
import * as variantService from "../service/variant.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /variant/ <- create a productVariant
router.post("/", [
  body("productId").exists().isInt().withMessage("invalid product id"),
  body("stock").exists().isInt(),
  body("price").exists().isFloat(),
  body("discount").exists().isFloat(),
  body("offerEnd").optional().isDate(),
  body("image").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createVariantDto = req.body as CreateVariantDto;
  try {
    const response = await variantService.createVariant(createVariantDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /variant/{id} <- update productVariant details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("productId").optional().isInt().withMessage("invalid product id"),
  body("stock").optional().isInt(),
  body("price").optional().isFloat(),
  body("discount").optional().isFloat(),
  body("offerEnd").optional().isDate(),
  body("image").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateVariantDto = req.body as UpdateVariantDto;
  updateVariantDto.id = parseInt(req.params.id);
  try {
    const response = await variantService.updateVariant(updateVariantDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /variant/{id} <- delete productVariant
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteVariantDto = { id: parseInt(req.params.id) } as DeleteVariantDto;
  try {
    await variantService.deleteVariant(deleteVariantDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /variant/query <- list productVariants (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryVariantsDto;
    const response = await variantService.queryVariants(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /variant/{id} <- get single productVariant
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await variantService.getVariantById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /variant/{id}/attribute/{aid} <- add an attribute with aid { value: "" }
router.put("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid attribute id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addVariantAttributeDto = <AddVariantAttributeDto> {
      variantId: parseInt(req.params.id),
      attributeId: parseInt(req.params.aid),
      value: req.body.value
    };
    await variantService.addVariantAttribute(addVariantAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /variant/{id}/attribute/{aid} <- delete attribute from variant
router.delete("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid attribute id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const removeVariantAttributeDto = <RemoveVariantAttributeDto> {
      variantId: parseInt(req.params.id),
      attributeId: parseInt(req.params.aid)
    };
    await variantService.removeVariantAttribute(removeVariantAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;