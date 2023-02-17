const oracledb = require('../models/Oracle');

class Member {
    insertsql = 'insert into member' +
        ' (mno, userid, passwd, name, email)' +
        ' values (mno.nextval, :1, :2, :3, :4) '; // 제발 이름 바로쓰자~~ mno를 mbno로 해서 애먹었음!!
    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }
    // 회원 정보 저장
    async insert(){
        let conn = null;
        let params = [this.userid, this.passwd, this.name, this.email];
        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(this.insertsql, params);
            await conn.commit();
            if(result.rowsAffected > 0) console.log('회원정보 저장 성공!'); // 회원정보가 생기면, 콘솔출력
            console.log(result);
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }
    }

    // 멤버 전체조회

    // 멤버 상세조회

}
module.exports = Member;