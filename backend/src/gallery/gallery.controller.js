const express = require("express");
const router = express.Router();
const GallerysService = require("./gallery.service");
const GalleryService = new GallerysService();

router.get("/", async function (req, res) {
  const { statusCode, responseBody } = await GalleryService.categoryList();

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
