import { Router } from "express";

import userRoute from './user.route';

import categoryRoute from "./category.route";
import subCategoryRoute from './subCategory.route';

import attributeRoute from "./attribute.route";
import tagRoute from "./tag.route";


import productRoute from './product.route';
import productImageRoute from './productImage.route';

// import variantAttributeRoute from './variantAttribute.route';
import variantRoute from './variant.route';

import reviewRoute from './review.route';
import likeRoute from './likes.route';

import  orderRoute from './order.route'
import promoCodeRoute from './promocode.route'
import  searchRoute from './search.route'

const router = Router();

router.use("/attribute", attributeRoute);
router.use("/tag", tagRoute);

router.use("/category", categoryRoute);
router.use('/subcategory', subCategoryRoute);

router.use('/user', userRoute);


// router.use('/variant/attribute', productVariantAttributeRoute);
router.use('/variant', variantRoute);

router.use('/product/image', productImageRoute);
router.use('/product', productRoute);

router.use('/review',reviewRoute)

router.use('/likes',likeRoute)

router.use('/order',orderRoute)

router.use('/promo',promoCodeRoute)
router.use('/search',searchRoute)

export default router;