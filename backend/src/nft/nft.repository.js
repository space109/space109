const connection = require("../../config/connection").promise();

class NftRepository {
  async sellMyNft(toeknId, scale, position, galleryId, oa) {
    const getCategoryId = `(select category_id from gallery where gallery_id = ${galleryId})`;
    const sql = `INSERT INTO SELL(GALLERY_ID, OA, CATEGORY_ID, TOKEN_ID, SCALE, POSITION) 
            VALUES(
                ${galleryId},
                '${oa}',
                (${getCategoryId}),
                '${toeknId}',
                ${scale},
                ${position}
                );`;
    let returnBool = true;
    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        returnBool = false;
      });
    console.log(result);
    return returnBool;
    // if (result.length == 1) return true;
    // else return false;
  }
}
module.exports = NftRepository;
