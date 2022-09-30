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

  async getMyGalleryInfo(oa) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.getMyGalleryInfo(oa),
      },
    };
  }

  async updateMyGallery(
    oa,
    category_id,
    description,
    title,
    thumbnail,
    isOpen
  ) {
    // console.log("updateMyGallery");

    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await GalleryRepository.updateMyGallery(
          oa,
          category_id,
          description,
          title,
          thumbnail,
          isOpen
        ),
      },
    };
  }
}

module.exports = GallerysService;
