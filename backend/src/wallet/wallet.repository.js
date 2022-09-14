const connection = require("../../config/connection").promise();

class WalletRepository {
  async searchWallet(oa) {
    const sql = `select user_id,oa,nickname from user where oa='${oa}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });

    return result;
  }

  async checkNickname(nickname) {
    const sql = `select nickname from user where nickname='${nickname}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });

    if (result.length == 1) return true;
    else return false;
  }

  async insert(oa, nickname) {
    const sql = `insert into user (oa,nickname) values ('${oa}','${nickname}')`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        return false;
      });

    if (result.affectedRows == 1) return true;
  }
}

module.exports = WalletRepository;
