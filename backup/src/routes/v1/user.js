const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');

router.use('/', userController.getAllUsers);

module.exports = router;
