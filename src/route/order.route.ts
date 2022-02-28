import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import * as likeService from "../service/likes.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";
import {OrderCreateDto, OrderDeleteDto, OrderQueryDto, OrderUpdateDto} from "../dto/order.dto";
import * as orderService from "../service/order.service"
import {DeleteReviewDto, UpdateReviewDto} from "../dto/review.dto";
import * as reviewService from "../service/review.service";
import * as productImageService from "../service/productImage.service";


const router = Router();

// POST /route/ <- create a route
router.post("/", [
  body("userId").exists().isString(),
  body("firstname").exists().isString(),
  body("lastname").exists().isString(),
  body("addressLine1").exists().isString(),
  body("addressLine2").exists().isString(),
  body("city").exists().isString(),
  body("province").exists().isString(),
  body("postcode").exists().isString(),
  body("country").exists().isString(),
  body("phone").exists().isString(),
  body("email").exists().isEmail(),
  body("currency").exists().isString(),
  body("rate").exists().isNumeric(),
  body("type").exists().isString(),
  body("items").exists().isArray({min:1}).withMessage('ItemsCannotBeEmptyException')
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const OrderCreateDto = req.body as OrderCreateDto;
  try {
    const response = await orderService.createOrder(OrderCreateDto,);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /order/{id} <- update order details
router.put("/:id", [
  param("id").exists().isString().withMessage("invalid id"),
  body("firstname").exists().isString(),
  body("lastname").exists().isString(),
  body("companyName").exists().isString(),
  body("addressLine1").exists().isString(),
  body("addressLine2").exists().isString(),
  body("city").exists().isString(),
  body("province").exists().isString(),
  body("postcode").exists().isString(),
  body("country").exists().isString(),
  body("phone").exists().isString(),
  body("email").exists().isString(),
  body("notes").exists().isString(),
  body("total").exists().isString(),
  body("currency").exists().isString(),
  body("rate").exists().isNumeric(),
  body("type").exists().isString(),
  body("status").exists().isInt(),
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const orderUpdateDto = req.body as OrderUpdateDto;
  orderUpdateDto.id = String(parseInt(req.params.id));
  try {
    const response = await orderService.updateOrder(orderUpdateDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /order/{id} <- delete order
router.delete("/:id", [
  param("id").exists().isString().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteOrderDto = { id: String(parseInt(req.params.id)) } as OrderDeleteDto;
  try {
    await orderService.deleteOrder(deleteOrderDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// Query Orders
router.get('/:id?',async(req: Request, res: Response, next: NextFunction) => {
  try{
    const limit = (req.query.limit) ? parseInt(req.query.limit as string) : null;
    const offset = (req.query.offset) ? parseInt(req.query.offset as string) : null;
    const userId = req.query.userId;
    const id = req.query.id;
  
    const queryDto = <OrderQueryDto> {
      userId: userId?userId:null,
      id : id? id :null,
      limit:limit,
      offset:offset
    }

    const response = await orderService.queryOrders(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);

  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
})


router.get('/query/:id',[param("id").exists().isString().withMessage("invalid id")], ValidationHelperMiddleware,async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const response = await orderService.queryOrderById(req.params.id);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  }catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
})



export default router;