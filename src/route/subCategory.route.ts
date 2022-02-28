import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import {
  CreateSubCategoryDto, DeleteSubCategoryAttributeDto,
  DeleteSubCategoryDto,
  LinkSubCategoryAttributeDto,
  QuerySubCategoriesDto, ResponseSubCategoriesDTO,
  UpdateSubCategoryDto
} from "../dto/subCategory.dto";
import * as subCategoryService from "../service/subCategory.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import {ResponsePromoCodeDto} from "../dto/promocode.dto";
import * as promoCodeService from "../service/promocode.service";

const router = Router();

// POST /subcategory/ <- create a subCategory
router.post("/", [
  body("name").exists().isString(),
  body("categoryId").exists().isInt().withMessage("invalid category id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createSubCategoryDto = req.body as CreateSubCategoryDto;
  try {
    const response = await subCategoryService.createSubCategory(createSubCategoryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /subcategory/{id}/attribute/{aid} <- link sub category with attribute (optional order int in body)
router.put("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid aid"),
  body("order").optional().isInt().withMessage("invalid order value")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const linkSubCategoryAttributeDto = req.body as LinkSubCategoryAttributeDto;
    linkSubCategoryAttributeDto.subCategoryId = parseInt(req.params.id);
    linkSubCategoryAttributeDto.attributeId = parseInt(req.params.aid);
    await subCategoryService.linkSubCategoryAttribute(linkSubCategoryAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /subcategory/{id}/attribute/{aid} <- remove category attribute
router.delete("/:id/attribute/:aid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("aid").exists().isInt().withMessage("invalid aid")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteSubCategoryAttributeDto = {} as DeleteSubCategoryAttributeDto;
    deleteSubCategoryAttributeDto.subCategoryId = parseInt(req.params.id);
    deleteSubCategoryAttributeDto.attributeId = parseInt(req.params.aid);
    await subCategoryService.deleteSubCategoryAttribute(deleteSubCategoryAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /subcategory/{id} <- update subCategory details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("name").optional().isString(),
  body("categoryId").exists().isUUID()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateSubCategoryDto = req.body as UpdateSubCategoryDto;
  updateSubCategoryDto.id = parseInt(req.params.id);
  try {
    const response = await subCategoryService.updateSubCategory(updateSubCategoryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /subcategory/{id} <- delete subCategory
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteSubCategoryDto = { id: parseInt(req.params.id) } as DeleteSubCategoryDto;
  try {
    await subCategoryService.deleteSubCategory(deleteSubCategoryDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /subcategory/query <- list subCategories (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QuerySubCategoriesDto;
    const response = await subCategoryService.querySubCategories(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /subcategory/{id} <- get single subCategory
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await subCategoryService.getSubCategoryById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


router.post("/query/category",[], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
  try {
    body("categoryId").exists().isString();
    const subCategoryDto = req.body as ResponseSubCategoriesDTO;
    const categoryId = subCategoryDto.categoryId
    const response = await subCategoryService.querySubCategoryByCategoryId(categoryId);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  }catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
})


export default router;