const express = require('express');
const router = express.Router();
const ensureAuthUser = require('../config/ensureAuthUser');
const orderCtrl = require('../controllers/order');

router.get('/', ensureAuthUser, orderCtrl.index);

module.exports = router