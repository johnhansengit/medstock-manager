const express = require('express');
const router = express.Router();
const druginfoCtrl = require('../controllers/druginfo');

router.get('/:drugName', druginfoCtrl.show);

module.exports = router