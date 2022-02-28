import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import * as promoCodeService from "../service/promocode.service";
import {CreatePromoCodeDto,UpdatePromoCodeDto,ResponsePromoCodeDto,DeletePromoCodeDto} from "../dto/promocode.dto";

const router = Router();

router.post("/",[
    body("promoCodeName").exists().isString(),
    body("validDate").isDate(),
    body("discountPrice").isNumeric(),
    body("MaxDiscount").isNumeric(),
    body("type").isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
    const createPromoCodeDto = req.body as CreatePromoCodeDto;
    try {
      const response = await promoCodeService.createPromoCode(createPromoCodeDto);
      new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
    }catch (e) {
        next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
});

router.put("/:id",[
    param("id").exists().isString().withMessage("invalid id"),
    body("promoCodeName").exists().isString(),
    body("validDate").isDate(),
    body("discountPrice").isNumeric(),
    body("MaxDiscount").isNumeric(),
    body("type").isString()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
    const updatePromoCodeDto = req.body as UpdatePromoCodeDto;
    updatePromoCodeDto.id = parseInt(req.params.id);
    try {
        const response = await promoCodeService.updatePromoCode(updatePromoCodeDto);
        new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
    }catch (e) {
        next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
})

router.delete("/:id", [
    param("id").exists().isString().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const deletePromoCodeDto = { id: parseInt(req.params.id) } as DeletePromoCodeDto;
    try {
        await promoCodeService.deletePromoCode(deletePromoCodeDto);
        new JSONResponse(res).sendSuccess({}, httpStatus.CREATED);
    } catch (e) {
        next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
});


router.get("/:id", [
    param("id").exists().isString().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await promoCodeService.getPromoCodeById(parseInt(req.params.id));
        new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
    } catch (e) {
        next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
});

router.post("/query",[], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction)=>{
    try {
        body("promoCodeName").exists().isString();
        body("total").exists().isString();
        const queryPromoCodeDto = req.body as ResponsePromoCodeDto;
        const promoCodeName = queryPromoCodeDto.promoCodeName;
        const total = queryPromoCodeDto.total;
        const response = await promoCodeService.queryPromoCode(promoCodeName,total);

        new JSONResponse(res).sendSuccess(response, httpStatus.OK);
    }catch (e) {
        next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
})



export default router;