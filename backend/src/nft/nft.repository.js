const connection = require("../../config/connection").promise();
const logger = require("../../config/log");

class NftRepository {
  async displayMyNft(
    tokenId,
    scale,
    position,
    positionXYZ,
    galleryId,
    oa,
    metadata
  ) {
    const sql = `INSERT INTO nft(GALLERY_ID, OA,  TOKEN_ID, SCALE, POSITION, POSITIONXYZ, METADATA) 
            VALUES(
                ${galleryId},
                '${oa}',
                ${tokenId},
                '${scale}',
                ${position},
                '${positionXYZ}',
                '${metadata}'
                );`;
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        returnBool = false;
      });
    logger.debug("result = " + returnBool);
    return returnBool;
    // if (result.length == 1) return true;
    // else return false;
  }

  async updateDisplayInfo(nftId, scale, position, positionXYZ, metadata) {
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
    if (scale == null && position == null && positionXYZ == null) return false;
    let sql = ``;
    const sqlHead = `update nft set `;
    const sqlTail = ` where NFT_ID=${nftId}`;
    sql += sqlHead;
    if (scale != null) sql += `scale='${scale}',`;
    if (position != null) sql += ` position=${position},`;
    if (positionXYZ != null) sql += ` positionXYZ='${positionXYZ}',`;
    if (metadata != null) sql += ` metadata='${metadata}',`;
    sql = sql.slice(0, -1);
    sql += sqlTail;
    logger.debug(sql);
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
        returnBool = false;
      });
    logger.debug("result = " + returnBool);
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
