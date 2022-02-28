import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { ValidationHelperMiddleware } from "../middleware/validation";
import {
  CreateProductDto,
  DeleteProductDto,
  LinkProductTagDto,
  QueryProductsDto,
  RemoveLinkProductTagDto,
  UpdateProductDto,
  Order, QueryProductDtoBySku
} from "../dto/product.dto";
import * as productService from "../service/product.service";
import { HttpStatus, JSONResponse } from "../lib/jsonResponse";
import * as httpStatus from "http-status-codes";
import { APIError } from "../lib/errors";

const router = Router();

// POST /product/ <- create a product
router.post("/", [
  body("sku").exists().isString(),
  body("title").exists().isString(),
  body("description").exists().isString(),
  body("stock").exists().isInt(),
  body("price").exists().isFloat(),
  body("discount").exists().isFloat(),
  body("offerEnd").optional().isDate(),
  body("new").optional().isBoolean(),
  body("rating").optional().isFloat()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const createProductDto = req.body as CreateProductDto;
  try {
    const response = await productService.createProduct(createProductDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.CREATED);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// PUT /product/{id}/tag/{tid} <- add tag to product
router.put("/:id/tag/:tid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("tid").exists().isInt().withMessage("invalid tag id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const linkProductTagDto = {} as LinkProductTagDto;
  linkProductTagDto.productId = parseInt(req.params.id);
  linkProductTagDto.tagId = parseInt(req.params.tid);
  try {
    await productService.linkProductTag(linkProductTagDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /product/{id}/tag/{tid} <- remove tag from product
router.delete("/:id/tag/:tid", [
  param("id").exists().isInt().withMessage("invalid id"),
  param("tid").exists().isInt().withMessage("invalid tag id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const removeLinkProductTagDto = {} as RemoveLinkProductTagDto;
  removeLinkProductTagDto.productId = parseInt(req.params.id);
  removeLinkProductTagDto.tagId = parseInt(req.params.tid);
  try {
    await productService.removeLinkProductTag(removeLinkProductTagDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


// PUT /product/{id} <- update product details
router.put("/:id", [
  param("id").exists().isInt().withMessage("invalid id"),
  body("sku").optional().isString(),
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("stock").optional().isInt(),
  body("price").optional().isFloat(),
  body("discount").optional().isFloat(),
  body("offerEnd").optional().isDate(),
  body("new").optional().isBoolean(),
  body("rating").optional().isFloat()
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const updateProductDto = req.body as UpdateProductDto;
  updateProductDto.id = parseInt(req.params.id);
  try {
    const response = await productService.updateProduct(updateProductDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// DELETE /product/{id} <- delete product
router.delete("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const deleteProductDto = { id: parseInt(req.params.id) } as DeleteProductDto;
  try {
    await productService.deleteProduct(deleteProductDto);
    new JSONResponse(res).sendSuccess({}, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/query <- list products (optional querying capabilities)
// parameters <-
//    limit, skip, categoryId, subCategoryId
//    attributes = [attributeId],[attributeValue][|]
//    eg:- query?attributes=1,hello|2,world
router.get("/query", [], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = (req.query.limit) ? parseInt(req.query.limit as string) : null;
    const offset = (req.query.offset) ? parseInt(req.query.offset as string) : null;
    const categoryId = (req.query.categoryId) ? parseInt(req.query.categoryId as string) : null;
    const subCategoryId = (req.query.subCategoryId) ? parseInt(req.query.subCategoryId as string) : null;
    const tagId = (req.query.tagId) ? parseInt(req.query.tagId as string) : null;
  
  

    const attributes = (req.query.attributes) ? (function() {
      const items = (req.query.attributes as string).split("|");
      return items.map(v => {
        const d = v.split(",", 2);
        const attributeId = parseInt(d[0]);
        const attributeValue = d[1];
        console.log('fu'+d);
        return {
          attributeId,
          value: attributeValue
        }
      }).filter(v => {
        return v.attributeId;
      });
    })() : null;

    const order = (req.query.order)?(function(){
      const [orderBy,orderDirString] = (req.query.order as string).split(',');
      let orderDir: Order | undefined;
      if(orderDirString==='ASC'){
        orderDir = Order.ASC;
      }else if(orderDirString==='DESC'){
        orderDir = Order.DESC;
      }else{
        orderDir = undefined;
      }
      return [orderBy,orderDir];
      
    })():null;

    const searchQuery = (req.query.search)? req.query.search :null;

    const queryDto = <QueryProductsDto> {
      limit: limit,
      offset: offset,
      categoryId,
      subCategoryId,
      attributes,
      orderBy: order?order[0]:null,
      orderDir: order?order[1]:null,
      search:searchQuery
    };
    const response = await productService.queryProducts(queryDto);
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});


// GET /product/{id} <- get single product
router.get("/:id", [
  param("id").exists().isInt().withMessage("invalid id")
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await productService.getProductById(parseInt(req.params.id));
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

// GET /product/{id} <- get single product by sku
router.post("/sku", [
  body("sku").exists().isString(),
], ValidationHelperMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {

    const queryProductBySku  = req.body as QueryProductDtoBySku;
    const sku = queryProductBySku.sku;
    const response = await productService.getProductBySKU(sku);
    console.log(response)
    new JSONResponse(res).sendSuccess(response, httpStatus.OK);
  } catch (e) {
    next(new APIError(e.message || "Error", HttpStatus.INTERNAL_SERVER_ERROR));
  }
});

export default router;


