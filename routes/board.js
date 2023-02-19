const express = require('express');
const path = require('path');
const Board = require('../models/Board');


const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'board.html'));
    res.render('board', {title: '게시판'});
});

router.get('/list', async (req, res) => {
    let bds = await new Board().select().then(async result => { return await result;});
    console.log('어웨이트 bds:11', bds);
    console.log('어웨이트 bds:', await bds);
    // res.sendFile(path.join(__dirname, '../public', 'list.html'));

    res.render('board/list', {title: '게시판 목록', bds: await bds});
});

router.get('/write', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'write.html'));
    res.render('board/write', {title: '게시판 새글쓰기'});
});
router.post('/write', (req, res, next) => {
    console.log(req.body);
    //let {title, uid, views, contents} = req.body;
    console.log(req.body.title, req.body.uid, req.body.contents);
   // console.log(title, userid, contents);
   new Board(req.body.title, req.body.uid, req.body.contents).insert();
    //new Board(title, uid, views, contents).insert();
    //res.render('board/list', {title: '게시판 목록'});
    res.redirect(303, '/board/list'); // 다른페이지로이동
});

router.get('/view', async (req, res) => {
    console.log('view로 들어옴');

    //res.render('board/view', {title : '게시글'});
   let bno = req.query.bno;
    console.log('bno : 쿼리스트링', bno);

    let bds = await new Board().selectOne(bno).then(async result => {return await result;});
    console.log(await bds);
    // res.sendFile(path.join(__dirname, '../public', 'view.html'));
    //res.redirect(303, '/board/list'); // 다른페이지로이동
    res.render('board/view', {title: '게시판 본문보기', bds: await bds});
});

router.get('/delete', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'delete.html'));
    res.render('delete', {title: '게시글 삭제'});
});

router.get('/update', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'update.html'));
    res.render('board/update', {title: '게시글 수정'});
});

module.exports = router;