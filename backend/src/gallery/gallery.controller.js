const express = require("express");
const router = express.Router();
const GallerysService = require("./gallery.service");
const GalleryService = new GallerysService();

router.get("/", async function (req, res) {
  const { statusCode, responseBody } = await GalleryService.categoryList();

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/list", async function (req, res) {
  const { statusCode, responseBody } = await GalleryService.listAll();

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/:theme", async function (req, res) {
  const { statusCode, responseBody } = await GalleryService.listByCategory(
    req.query["theme"]
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.put("/my", async function (req, res) {
  const { statusCode, responseBody } = await GalleryService.updateMyGallery(
    req.body.oa,
    req.body.category_id,
    req.body.description,
    req.body.title,
    req.body.thumbnail
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
