const express = require('express');
const router = express.Router();
const ensureAuthUser = require('../config/ensureAuthUser');
const inoutsCtrl = require('../controllers/inouts');


router.get('/', ensureAuthUser, inoutsCtrl.index);
router.get('/:id/stock/:stockId/add', inoutsCtrl.addStock);
router.get('/:id/stock/:stockId/deplete', inoutsCtrl.depleteStock);
router.post('/:id/stock/:stockId', inoutsCtrl.create);

module.exports = router;