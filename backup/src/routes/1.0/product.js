const router = require('express').Router();
const productController = require('../../controllers/1.0/product');

router.get('/list/:limit?/:offset?',productController.list);
router.get('/sort/:type/:value/:limit?/:offset?',productController.sort);
router.get('/categories/',productController.categories);
router.get('/sub-categories/:category',productController.subCategories);
router.get('/brands/:category/:all?',productController.brands)


module.exports = router; 