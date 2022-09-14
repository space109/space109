const connection = require("../../config/connection").promise();

class GalleryRepository {
  async categoryList() {
    const sql = `select category_id,category_title from category`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });

    return result;
  }

  async listAll() {
    const sql = `select gallery_id, oa, category_id, description, title, thumbnail from gallery`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });

    return result;
  }

  async listByCategory(category_id) {
    const sql = `select gallery_id, oa, category_id, description, title, thumbnail from gallery where category_id=${category_id}`;

    const result = await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
      });

    return result;
  }

  async updateMyGallery(oa, category_id, description, title, thumbnail) {
    const sql = `update gallery set category_id=${category_id}, description='${description}', title='${title}', thumbnail='${thumbnail}' where oa='${oa}'`;

    const result = await connection
      .query(sql)
      .then((data) => data[0].affectedRows)
      .catch((e) => {
        console.error(e);
      });

    return result;
  }
}

module.exports = GalleryRepository;
