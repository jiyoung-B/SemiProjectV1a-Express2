const oracledb = require('../models/Oracle');

class Board {

    options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

     selectsql = ` select bno, title, userid, to_char(regdate, 'YYYY-MM-DD'), views, contents from board order by bno desc `;
     selectOnesql = ` select bno, title, userid, to_char(regdate, 'YYYY-MM-DD HH:MI:SS'), views, contents ` +
                    ` from board where bno = :1 `;

     constructor(title, userid, contents) {
         this.title = title;
         this.userid = userid;
         this.views = 0;
         this.contents = contents;
     }

     async insert(){
         let conn = null;
         let sql = ' insert into board ' +
             ' (bno, title, userid, views, contents) ' +
             ' values (bno.nextval, :1, :2, :3, :4) ';
         let params = [this.title, this.userid, this.views, this.contents]

         try {
             conn = await oracledb.makeConn();
             let result = await conn.execute(sql, params);
             await conn.commit();
             if(result.rowsAffected > 0) console.log('회원정보 저장 성공!');
             console.log(result);
         }catch(e){
             console.log(e);
         }finally {
             await oracledb.closeConn(conn);

         }
     }

     async select() {
         let conn = null;
         let result = null;
         let bds = [];
         // selectsql = ` select bno, title, userid, to_char(regdate, 'YYYY-MM-DD'), views, contents from board order by bno desc `;
        // selectsql = `select bno, title, userid, to_char(regdate, 'YYYY-MM-DD'), views
         try {
             conn = await oracledb.makeConn();
             console.log('커넥트')
             result = await conn.execute(this.selectsql, [], this.options);
             let rs = result.resultSet;
             console.log('rs :', rs);
             let row = null;
             while((row = await rs.getRow())){
                 console.log('while문')
                 let bd = new Board(row[1], row[2], row[4], row[5]);
                 bd.bno = row[0];
                 bd.regdate = row[3];
                 bds.push(bd);
             }
             consol.log('bds :', bds);
         } catch (e) {
             console.log(e);
         } finally {
             await oracledb.closeConn(conn);
         }
         return await bds;
     }

    async selectOne(bno) {
         let conn = null;
         let result = null;
         let bds = [];
        console.log('bno : ', bno);

         try {
             conn = await oracledb.makeConn();
             result = await conn.execute(this.selectOnesql, [bno], this.options);
             let rs = result.resultSet;
             let row = null;
             console.log('결과 :', result);
             console.log('셀렉트원연결완료')
             while((row = await rs.getRow())){
                 let bd = new Board(row[1], row[2], row[4], row[5]);
                 bd.bno = row[0];
                 bd.regdate = row[3];
                 console.log('셀렉ㅌ,원', bd.regdate);
                 bds.push(bd);
             }
         }catch (e){
             console.log(e);
         } finally {
             await oracledb.closeConn(conn);
         }
         console.log('bds 값 : ', bds);
         return await bds;
        
    }
}
module.exports = Board;



