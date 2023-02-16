const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public', 'index.html'));
    res.render('index', {title: '첫 화면'});
})

module.exports = router;