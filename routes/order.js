const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order');

router.get('/', orderCtrl.index);

module.exports = router