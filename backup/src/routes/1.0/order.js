const router = require('express').Router();
const orderController = require('../../controllers/1.0/order');

router.post("/test",orderController.test)

module.exports = router;