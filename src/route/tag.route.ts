import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { CreateTagDto, DeleteTagDto, QueryTagsDto, UpdateTagDto } from "../dto/tag.dto";
import * as tagService from "../service/tag.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /product/tag/ <- create a tag
router.post("/", [
  body("name").exists().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createTagDto = req.body as CreateTagDto;
  try {
    const response = await tagService.createTag(createTagDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /product/tag/{id} <- update tag details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("name").optional().isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateTagDto = req.body as UpdateTagDto;
  try {
    updateTagDto.id = parseInt(req.params.id);
    const response = await tagService.updateTag(updateTagDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /product/tag/{id} <- delete tag
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteTagDto = { id: parseInt(req.params.id) } as DeleteTagDto;
  try {
    await tagService.deleteTag(deleteTagDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/tag/query <- list tags (optional querying capabilities)
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryDto = {} as QueryTagsDto;
    const response = await tagService.queryTags(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/tag/{id} <- get single tag
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await tagService.getTagById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;