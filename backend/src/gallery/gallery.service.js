const GallerysRepository = require("./gallery.repository");
const GalleryRepository = new GallerysRepository();

class GallerysService {
  async categoryList() {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.categoryList(),
      },
    };
  }

  async listAll() {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.listAll(),
      },
    };
  }

  async listByCategory(category_id) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.listByCategory(category_id),
      },
    };
  }

  async updateMyGallery(oa, category_id, description, title, thumbnail) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.updateMyGallery(
          oa,
          category_id,
          description,
          title,
          thumbnail
        ),
      },
    };
  }
}

module.exports = GallerysService;
