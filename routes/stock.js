const express = require('express');
const router = express.Router();

const stockCtrl = require('../controllers/stock')


// router.post('/current/:id/stock/:stockId', stockCtrl.update);
router.post('/current/:id/stock', stockCtrl.create)
router.delete('/current/:id/stock/:stockId', stockCtrl.delete);
// router.get('/current/:id/stock/:stockId/add', stockCtrl.add);
// router.get('/current/:id/stock/:stockId/deplete', stockCtrl.deplete);


module.exports = router;