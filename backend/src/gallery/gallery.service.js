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
}

module.exports = GallerysService;
