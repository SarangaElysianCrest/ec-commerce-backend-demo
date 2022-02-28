const router = require('express').Router();
const productController = require('../../controllers/2.0/product-controller');
const categoryController = require('../../controllers/2.0/category-controller');
const subCategoryController = require('../../controllers/2.0/sub-category-controller');
const brandController = require('../../controllers/2.0/brand-controller');
const productImageController = require('../../controllers/2.0/product-image-controller');
const productVariantController = require('../../controllers/2.0/product-variant-controller');
const userController = require('../../controllers/2.0/user-controller');
const orderController = require('../../controllers/2.0/order-controller');
/**
 * Administration Routes
 * To be used by System Administrators and privileged users only.
 * TODO.md: Implement the Authorization Middleware
 */

//Products
router.put('/product',productController.create);
router.get('/product/list',productController.list);
router.patch('/product/:id',productController.update);
router.delete('/product/:id',productController.delete);

// router.get('/shop/listings',variantController.list)

// Categories
router.put('/category',categoryController.create);
router.get('/category/list',categoryController.list)

// Sub Categories
router.put('/sub-category',subCategoryController.create);

// Brands
router.put('/brand',brandController.create);

// Product Images
router.put('/product/:id/image',productImageController.add);

// Product Variants and Sizes
router.put('/product/:id/variant',productVariantController.addVariant);
router.put('/variant/:id/size',productVariantController.addSize);

// Product Feature Data
router.get('/variant/features',productVariantController.listFeatures)

// User Routes
router.post('/user/',userController.setUser);
router.get('/user/:id',userController.getUser);
// Transaction Routes
router.post('/order',orderController.create)


module.exports = router; 