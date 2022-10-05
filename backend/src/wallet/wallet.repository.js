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

  async count(gallery_id) {
    const sql1 = `select count(*) cnt from nft where sell=1 and gallery_id=${gallery_id}`;
    const sql2 = `select nft_id, gallery_id, oa, metadata, token_id from nft where sell=1 and gallery_id=${gallery_id}`;

    const result1 = await connection
      .query(sql1)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        return result1;
      });

    if (result1[0].cnt > 0) {
      const result2 = await connection
        .query(sql2)
        .then((data) => data[0])
        .catch((e) => {
          logger.error(e);
        });

      return result2;
    }
  }
}

module.exports = WalletRepository;
