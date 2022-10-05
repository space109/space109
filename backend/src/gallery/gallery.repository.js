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
    const sql = `select g.gallery_id, g.oa, g.category_id, g.description, g.title, g.thumbnail, u.nickname from gallery g left outer join user u using (oa) where category_id=${category_id} and is_open=1`;

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
    if (title != "null") sql += `title= '${title}',`;
    if (isOpen != "null") sql += `IS_OPEN= ${isOpenBool},`;
    sql = sql.slice(0, -1);
    sql += sqlTail;
    logger.debug(sql);

    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        logger.error(e);
        return 0;
      });

    return result;
  }

  async writeGuestbook(galleryId, nickname, description) {
    const sql = `insert into guest_book (gallery_id, nickname, description) 
    values (${galleryId}, '${nickname}', '${description}')`;
    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        logger.error(e);
        return 0;
      });

    return result;
  }

  async getGuestbookFinalPageNo(galleryId, countPerPage) {
    const sql = `select count(*) from guest_book where gallery_id=${galleryId}`;

    const result = await connection
      .query(sql)
      .then((data) => {
        const total = data[0][0]["count(*)"];
        const finalPageNo = Math.ceil(total / countPerPage);
        return finalPageNo;
      })
      .catch((e) => {
        logger.error(e);
        return false;
      });

    return result;
  }

  async guestbookList(galleryId, countPerPage, currentPage) {
    console.log("galleryId", galleryId);
    console.log("countPerPage", countPerPage);
    console.log("currentPage", currentPage);
    const sql = `select * from guest_book 
                  where gallery_id=${galleryId} 
                    order by guest_book_id desc
                      limit ${countPerPage} 
                        offset ${countPerPage * (currentPage - 1)}`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        logger.error(e);
      });

    return result;
  }
  async resetGuestbook(galleryId) {
    const sql = `delete from guest_book where gallery_id=${galleryId}`;
    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        logger.error(e);
        return 0;
      });

    return result;
  }
}

module.exports = GalleryRepository;
