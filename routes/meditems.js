const express = require('express');
const router = express.Router();
const ensureAuthUser = require('../config/ensureAuthUser');
const meditemsCtrl = require('../controllers/meditems');


router.get('/', ensureAuthUser, meditemsCtrl.index);
router.get('/new', meditemsCtrl.new);
router.delete('/:id', meditemsCtrl.delete);
router.get('/:id', meditemsCtrl.show);
router.get('/:id/edit', meditemsCtrl.edit);
router.post('/', meditemsCtrl.create);
router.put('/:id', meditemsCtrl.update);
// router.get('/', meditemsCtrl.search);

module.exports = router;