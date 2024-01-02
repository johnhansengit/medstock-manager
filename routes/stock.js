const express = require('express');
const router = express.Router();

const stockCtrl = require('../controllers/stock')

router.post('/current/:id/stock', stockCtrl.create)

module.exports = router;