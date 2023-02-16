const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'board.html'));
    res.render('board', {title: '게시판'});
});

router.get('/list', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'list.html'));
    res.render('board/list', {title: '게시판 목록'});
});

router.get('/write', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'write.html'));
    res.render('board/write', {title: '게시판 새글쓰기'});
});

router.get('/view', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'view.html'));
    res.render('board/view', {title: '게시판 본문보기'});
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