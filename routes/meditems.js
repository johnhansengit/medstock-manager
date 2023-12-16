const express = require('express');
const router = express.Router();

const meditemsCtrl = require('../controllers/meditems');

router.get('/', meditemsCtrl.index);
router.get('/new', meditemsCtrl.new);
router.get('/:id', meditemsCtrl.show);
router.post('/', meditemsCtrl.create);
router.delete('/:id', meditemsCtrl.delete);

module.exports = router;