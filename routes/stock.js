const express = require('express');
const router = express.Router();

const stockCtrl = require('../controllers/stock')


router.post('/current/:id/stock', stockCtrl.create)
router.post('/current/:id/stock/:stockId/delete', stockCtrl.delete);
router.post('/current/:id/stock/:stockId/edit', stockCtrl.update);
router.get('/current/:id/stock/:stockId/edit', stockCtrl.edit);


module.exports = router;