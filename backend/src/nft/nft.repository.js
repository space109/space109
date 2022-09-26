const connection = require("../../config/connection").promise();
const logger = require("../../config/log");

class NftRepository {
  async displayMyNft(toeknId, scale, position, galleryId, oa) {
    const sql = `INSERT INTO nft(GALLERY_ID, OA,  TOKEN_ID, SCALE, POSITION) 
            VALUES(
                ${galleryId},
                '${oa}',
                '${toeknId}',
                ${scale},
                '${position}'
                );`;
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        returnBool = false;
      });
    logger.debug("result = " + result);
    return returnBool;
    // if (result.length == 1) return true;
    // else return false;
  }

  async updateDisplayInfo(nftId, scale, position) {
    // scale, position 둘 다 undefined일경우 무조건 return false를 넣어줘야함
    // typeof str == "undefined" || str == null || str == ""
    /*
    UPDATE 테이블이름
    SET 필드이름1=데이터값1, 필드이름2=데이터값2, ...
    WHERE 필드이름=데이터값
    */
    // console.log(nftId);
    // console.log(scale);
    // console.log(position);
    let sql = ``;
    if (scale != null && position == null) {
      // scale에 값이 있다.
      console.log("scale에 값이 있다.");
      sql = `UPDATE nft SET SCALE = ${scale} WHERE NFT_ID = ${nftId}`;
    } else if (scale == null && position != null) {
      // position에 값이 있다.
      console.log("position에 값이 있다.");
      sql = `UPDATE NFT SET POSITION = '${position}' WHERE NFT_ID = ${nftId}`;
    } else if (scale != null && position != null) {
      // 둘 다 값이 있다.
      console.log("둘 다 값이 있다.");
      sql = `UPDATE NFT SET SCALE = ${scale}, POSITION = '${position}' WHERE NFT_ID = ${nftId}`;
    } else {
      // 둘 다 값이 없다.
      console.log("둘 다 값이 없다.");
      return false;
    }
    logger.debug(sql);
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        returnBool = false;
      });
    logger.debug("result = " + result);
    return returnBool;
  }
  async getDisplayedNftList(galleryId) {
    const sql = `SELECT * FROM nft WHERE GALLERY_ID = ${galleryId};`;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }
  async deleteNft(nftId) {
    const sql = `DELETE FROM nft WHERE NFT_ID = ${nftId};`;
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => {
        returnBool = data[0].affectedRows;
      })
      .catch((e) => {
        logger.error(e);
        returnBool = 0;
      });
    if (returnBool === 0) {
      return false;
    } else {
      return true;
    }
    // console.log(result);
    // return returnBool;
  }
}
module.exports = NftRepository;
