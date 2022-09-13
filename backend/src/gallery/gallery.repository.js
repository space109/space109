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
}

module.exports = GalleryRepository;
