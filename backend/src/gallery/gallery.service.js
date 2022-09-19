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

  async updateMyGallery(
    oa,
    category_id,
    description,
    title,
    thumbnail,
<<<<<<< HEAD
    isopen
  ) {
=======
    isOpen
  ) {
    // console.log("updateMyGallery");

>>>>>>> a6b032efb47a7847e3f6e81e9ec77ee64f9822a5
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
<<<<<<< HEAD
          isopen
=======
          isOpen
>>>>>>> a6b032efb47a7847e3f6e81e9ec77ee64f9822a5
        ),
      },
    };
  }
}

module.exports = GallerysService;
