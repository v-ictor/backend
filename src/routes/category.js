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

router.post('/test', (req, res) => {
    let {numero, text} = req.body;
    if(numero.indexOf(',') != -1){
        numero = numero.replace(".","");
        numero = numero.replace(",",".");
        res.json({msg: 'con comas.',total: Number(numero)});
    } else {
        res.json({msg: 'sin comas.',total: Number(numero)});
    }
});

module.exports = router;