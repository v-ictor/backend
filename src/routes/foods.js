const {Router} = require('express');
const router = Router();

const {upload} = require('../middlewares/image');

router.get('/foods', (req, res) => {
    res.send('Foods');
});

router.post('/foods/add', upload.single('imgFood'))

module.exports = router;

// 'use strict' // Cargamos los modelos para usarlos posteriormente
// var User = require('../models/user');
// // Conseguir datos de un usuariofunction getUser(req, res){
// var userId = req.params.id; //buscar un documento por un  id
// User.findById(userId, (err, user) => {
//     if (err) return res.status(500).send({
//         message: 'Error en la petición'
//     });
//     if (!user) return res.status(404).send({
//         message: 'EL usuario no existe'
//     });
//     followThisUser(req.user.sub, userId).then((value) => {
//         user.password = undefined;
//         return res.status(200).send({
//             user,
//             following: value.following,
//             followed: value.followed
//         });
//     });
// });