import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { CreateAttributeDto, DeleteAttributeDto, QueryAttributesDto, UpdateAttributeDto } from "../dto/attribute.dto";
import * as attributeService from "../service/attribute.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import { AttributeType } from "../db/entity/attribute";

const router = Router();

// POST /attribute/ <- create a attribute
router.post("/", [
  body("name").exists().isString(),
  body("type").exists().isIn(Object.values(AttributeType)).withMessage("Invalid Attribute Type")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createAttributeDto = req.body as CreateAttributeDto;
  try {
    const response = await attributeService.createAttribute(createAttributeDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /attribute/{id} <- update attribute details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("name").optional().isString(),
  body("type").exists().isIn(Object.values(AttributeType)).withMessage("Invalid Attribute Type")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateAttributeDto = req.body as UpdateAttributeDto;
  try {
    updateAttributeDto.id = parseInt(req.params.id);
    const response = await attributeService.updateAttribute(updateAttributeDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.OK));
  }
});

// DELETE /attribute/{id} <- delete attribute
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteAttributeDto = { id: parseInt(req.params.id) } as DeleteAttributeDto;
    await attributeService.deleteAttribute(deleteAttributeDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /attribute/query <- list attributes (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryAttributesDto;
    const response = await attributeService.queryAttributes(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /attribute/{id} <- get single attribute
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await attributeService.getAttributeById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;