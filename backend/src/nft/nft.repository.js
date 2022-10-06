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
    metadata,
    rotation
  ) {
    const sql = `INSERT INTO nft(GALLERY_ID, OA,  TOKEN_ID, SCALE, POSITION, POSITIONXYZ, METADATA, ROTATION) 
            VALUES(
                ${galleryId},
                '${oa}',
                ${tokenId},
                '${scale}',
                ${position},
                '${positionXYZ}',
                '${metadata}',
                '${rotation}'
                );`;
    let resultValue = null;
    const result = await connection
      .query(sql)
      // .then((data) => data[0])
      .then((data) => {
        console.log(data);
        resultValue = data[0].insertId;
      })
      .catch((e) => {
        logger.error(e);
      });
    logger.debug("result = " + resultValue);
    return resultValue;
    // if (result.length == 1) return true;
    // else return false;
  }

  async updateDisplayInfo(
    nftId,
    scale,
    position,
    positionXYZ,
    metadata,
    rotation,
    tokenId
  ) {
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
    if (rotation != null) sql += ` rotation='${rotation}',`;
    if (tokenId != null) sql += ` token_id=${tokenId},`;
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

  // 판매됐을떄
  async sellNft(tokenId) {
    await connection.beginTransaction();
    // 판매한 NFT 정보 로그에 추가
    try {
      const sql1 = `insert into log(GALLERY_ID, OA,METADATA, TOKEN_ID) select GALLERY_ID, OA,METADATA, TOKEN_ID from nft where token_id=${tokenId}`;
      const sql1Result = await connection.query(sql1);

      // 판매한 NFT 정보 삭제
      const sql2 = `delete from nft where token_id=${tokenId}`;
      const sql2Result = await connection.query(sql2);
      await connection.commit();
    } catch (e) {
      await connection.rollback();
      logger.error(e);
      return false;
    } finally {
      await connection.release();
    }

    return true;
  }

  //  단순히 전시에서 내리는거
  async deleteFrame(nftId) {
    const sql = `delete from nft where nft_id=${nftId}`;
    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        logger.error(e);
      });

    if (result == 0) return false;
    return true;
  }
}
module.exports = NftRepository;
