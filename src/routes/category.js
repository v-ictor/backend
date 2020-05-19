const {Router} = require('express');
const router = Router();
const CategoryCtrl = require('../controllers/categoryCtrl');

const {upload} = require('../middlewares/image');

router.get('/category', CategoryCtrl.showCtgories);

router.get('/category/enable', CategoryCtrl.showCtgoriesEnable);

router.post('/category/add', upload.single('imageCtgory'), CategoryCtrl.createCategory);

router.get('/category/desc/:id', CategoryCtrl.showCtgory);

router.delete('/category/delete/:id', CategoryCtrl.deleteCtgory);

router.put('/category/update/:id', upload.single('imageCtgory'), CategoryCtrl.updateCtgory);
// router.put('/category/update/:id', CategoryCtrl.updateText);

router.get('/category/turn/:id', CategoryCtrl.enable);

router.get('/category/:key', CategoryCtrl.showCtgoryFoods);

module.exports = router;