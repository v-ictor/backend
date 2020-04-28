const {Router} = require('express');
const router = Router();

router.get('/foods', (req, res) => {
    res.send('Foods');
});

module.exports = router;