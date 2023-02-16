const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
   // res.sendFile(path.join(__dirname, '../public', 'member.html'));
    res.render('member', {title: 'member'});
});

router.get('/join', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'join.html'));
    res.render('join', {title: '회원가입'});
});

router.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'login.html'));
    res.render('login', {title: '회원로그인'});
});

router.get('/myinfo', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'myinfo.html'));
    res.render('myinfo', {title: '회원정보'});
});

module.exports = router;