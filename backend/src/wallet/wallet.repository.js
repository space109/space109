const connection = require("../../config/connection").promise();
const logger = require("../../config/log");

class WalletRepository {
  async searchWallet(oa) {
    const sql = `select user_id,oa,nickname from user where oa='${oa}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }

  async checkNickname(nickname) {
    const sql = `select nickname from user where nickname='${nickname}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    if (result.length == 1) return true;
    else return false;
  }

  async insert(oa, nickname) {
    const sql1 = `insert into user (oa,nickname) values ('${oa}','${nickname}')`;
    const sql2 = `insert into gallery(oa,category_id,description, title, thumbnail) values('${oa}',13,'${nickname}님의 갤러리입니다.', '${nickname}님의 갤러리','/image/thumbnail/default/thumbnail.jpg')`;

    const result = [];

    result[0] = await connection
      .query(sql1)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        return false;
      });

    result[1] = await connection
      .query(sql2)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        return false;
      });

    if (result[0].affectedRows == 1 && result[1].affectedRows == 1) return true;
  }

  // 팔린게 있는지 확인하고 있다면 그 token목록을 뽑아 온다.
  async sellCheck(gallery_id) {
    try {
      await connection.beginTransaction();
      // log 테이블에 팔린게 있는지 확인
      const sql1 = `select * from log where gallery_id=${gallery_id}`;
      console.debug(sql1);
      const sellList = await connection.query(sql1);
      console.debug(sellList[0]);
      // 만약 판매된 NFT가 하나도 없을 경우
      if (sellList[0].length == 0) {
        // 0을 리턴
        return 0;
      }
      const sql2 = `delete from log where gallery_id=${gallery_id}`;
      await connection.query(sql2);
      await connection.commit();
      return sellList[0];
    } catch (e) {
      await connection.rollback();
      return 0;
    }
  }
}

module.exports = WalletRepository;
