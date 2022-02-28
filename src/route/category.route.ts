import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import {
  CreateCategoryDto, DeleteCategoryAttributeDto,
  DeleteCategoryDto,
  LinkCategoryAttributeDto,
  QueryCategoriesDto,
  UpdateCategoryDto
} from "../dto/category.dto";
import * as categoryService from "../service/category.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /category/ <- create a category
router.post("/", [
  body("name").exists().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createCategoryDto = req.body as CreateCategoryDto;
  try {
    const response = await categoryService.createCategory(createCategoryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /category/{id}/attribute/{aid} <- link category with attribute (optional order int in body)
router.put("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid aid"),
  body("order").optional().isInt().withMessage("invalid order value")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const linkCategoryAttributeDto = req.body as LinkCategoryAttributeDto;
    linkCategoryAttributeDto.categoryId = parseInt(req.params.id);
    linkCategoryAttributeDto.attributeId = parseInt(req.params.aid);
    await categoryService.linkCategoryAttribute(linkCategoryAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /category/{id}/attribute/{aid} <- remove category attribute
router.delete("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid aid")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteCategoryAttributeDto = {} as DeleteCategoryAttributeDto;
    deleteCategoryAttributeDto.categoryId = parseInt(req.params.id);
    deleteCategoryAttributeDto.attributeId = parseInt(req.params.aid);
    await categoryService.deleteCategoryAttribute(deleteCategoryAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /category/{id} <- update category details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("name").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateCategoryDto = req.body as UpdateCategoryDto;
  updateCategoryDto.id = parseInt(req.params.id);
  try {
    const response = await categoryService.updateCategory(updateCategoryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /category/{id} <- delete category
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteCategoryDto = { id: parseInt(req.params.id) } as DeleteCategoryDto;
  try {
    await categoryService.deleteCategory(deleteCategoryDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /category/query <- list categories (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryCategoriesDto;
    const response = await categoryService.queryCategories(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /category/{id} <- get single category
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await categoryService.getCategoryById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;