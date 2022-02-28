import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { CreateBrandDto, DeleteBrandDto, QueryBrandsDto, UpdateBrandDto } from "../dto/brand.dto";
import * as brandService from "../service/brand.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /brand/ <- create a brand
router.post("/", [
  body("name").exists().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createBrandDto = req.body as CreateBrandDto;
  try {
    const response = await brandService.createBrand(createBrandDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /brand/{id} <- update brand details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("name").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateBrandDto = req.body as UpdateBrandDto;
  updateBrandDto.id = parseInt(req.params.id);
  try {
    const response = await brandService.updateBrand(updateBrandDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /brand/{id} <- delete brand
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteBrandDto = { id: parseInt(req.params.id) } as DeleteBrandDto;
  try {
    await brandService.deleteBrand(deleteBrandDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /brand/query <- list brands (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryBrandsDto;
    const response = await brandService.queryBrands(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /brand/{id} <- get single brand
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await brandService.getBrandById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;