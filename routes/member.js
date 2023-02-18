const express = require('express');
const path = require('path');
const Member = require('../models/Member');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('member', {title: 'member'});
});

router.get('/join', (req, res) => {
    res.render('join', {title: '회원가입'});
});
router.post('/join',  (req, res, next) => {
    // 폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인 가능
     console.log(req.body);
     //console.log(req.body.uid, req.body.name, req.body.email);
   let {userid, pwd, pwd2, name, email} = req.body; // 변수의 개수가 맞아야해.
    console.log(userid, pwd, name, email);
    new Member(userid, pwd, name, email).insert();

    res.redirect(303, '/member/login');
});

router.get('/login', (req, res) => {
    res.render('login', {title: '회원로그인'});
});

router.get('/myinfo', (req, res) => {
    res.render('myinfo', {title: '회원정보'});
});

module.exports = router;