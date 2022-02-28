import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { APIError } from "../lib/errors";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import { ValidationHelperMiddleware } from "../middleware/validation";
import * as searchService from "../service/search.service";

const router = Router();

router.get("/:name", [
    param("name").exists().withMessage("No result found")
  ], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
    //   const response = await searchService.getProductByName(parseInt(req.params.name));
      const response = await searchService.getProductByName(req.params.name);
      new JSONResponse(res).sendSuccess(response, HttpStatus.OK);
    } catch (e) {
      next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  });

  export default router;