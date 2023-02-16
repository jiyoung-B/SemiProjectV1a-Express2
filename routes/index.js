const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

module.exports = router; // 미들웨어 형식으로 만들어지게 하려면 반드시 필요