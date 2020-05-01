const {Router} = require('express');
const router = Router();
const FoodsCtrl = require('../controllers/foodsCtrl');

const {upload} = require('../middlewares/image');

router.get('/foods', FoodsCtrl.showFoods);

router.post('/foods/add', upload.single('imageFood'), FoodsCtrl.createFood);

router.get('/foods/desc/:id', FoodsCtrl.showFood);

router.delete('/foods/delete/:id', FoodsCtrl.deleteFood);

router.put('/foods/update/:id', upload.single('imageFood'),FoodsCtrl.updateFood);

module.exports = router;