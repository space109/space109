const connection = require("../../config/connection").promise();
const logger = require("../../config/log");

class GalleryRepository {
  async categoryList() {
    const sql = `select category_id,category_title from category`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }

  async listAll() {
    const sql = `select gallery_id, oa, category_id, description, title, thumbnail from gallery where is_open=1`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }

  async listByCategory(category_id) {
    const sql = `select gallery_id, oa, category_id, description, title, thumbnail from gallery where category_id=${category_id} and is_open=1`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }

  async getMyGalleryInfo(oa) {
    const sql = `select gallery_id, oa, category_id, description, title, thumbnail, is_open from gallery where oa='${oa}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }

  async updateMyGallery(
    oa,
    category_id,
    description,
    title,
    thumbnail,
    isOpen
  ) {
    // category_id, description, title, thumbnail, isOpen중 하나는 무조건 들어가야한다.
    // thumbnail은 이미지가 있으나 없으나 무조건 생성된다. 즉 fix다.
    if (
      (thumbnail == false) &
      (category_id == null) &
      (description == null) &
      (title == null) &
      (isOpen == null)
    )
      return false;
    let isOpenBool = isOpen == "true" ? 1 : 0;
    const sqlHead = `update gallery set `;
    const sqlTail = ` where oa='${oa}'`;
    let sql = ``;
    sql += sqlHead;
    if (thumbnail != false) sql += `thumbnail='${thumbnail}',`;
    if (category_id != "null") sql += `category_id= ${category_id},`;
    if (description != "null") sql += `description= '${description}',`;
    if (title != "null") sql += `title= '${title}','`;
    if (isOpen != "null") sql += `IS_OPEN= ${isOpenBool},`;
    sql = sql.slice(0, -1);
    sql += sqlTail;
    logger.debug(sql);

    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }
}

module.exports = GalleryRepository;
