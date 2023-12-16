const express = require('express');
const router = express.Router();

const meditemsCtrl = require('../controllers/meditems');

router.get('/', meditemsCtrl.index);
router.get('/new', meditemsCtrl.new);
router.post('/', meditemsCtrl.create);

module.exports = router;