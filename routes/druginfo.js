const express = require('express');
const router = express.Router();
const ensureAuthUser = require('../config/ensureAuthUser');
const druginfoCtrl = require('../controllers/druginfo');

router.get('/', ensureAuthUser, druginfoCtrl.search);
router.get('/:drugName', ensureAuthUser, druginfoCtrl.show);

module.exports = router