const express = require('express');
const router = express.Router();
const druginfoCtrl = require('../controllers/druginfo');

router.get('/', druginfoCtrl.show);

module.exports = router