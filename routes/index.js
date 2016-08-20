const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/apps', require('./apps'));
router.use('/updates', require('./updates'));

module.exports = router;
