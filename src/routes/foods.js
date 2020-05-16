const {Router} = require('express');
const router = Router();
const FoodsCtrl = require('../controllers/foodsCtrl');

const {upload} = require('../middlewares/image');

router.get('/foods', FoodsCtrl.showFoods);

router.get('/foods/enable', FoodsCtrl.showFoodsEnable);

router.post('/foods/add', upload.single('imageFood'), FoodsCtrl.createFood);

router.get('/foods/desc/:id', FoodsCtrl.showFood);

router.delete('/foods/delete/:id', FoodsCtrl.deleteFood);

router.put('/foods/update/:id', upload.single('imageFood'), FoodsCtrl.updateFood);
// router.put('/foods/update/:id', FoodsCtrl.upadteText);

router.get('/foods/turn/:id', FoodsCtrl.enable);

module.exports = router;