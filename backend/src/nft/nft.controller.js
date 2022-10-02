const express = require("express");
const router = express.Router();
const logger = require("../../config/log");
const NftService = require("./nft.service");
const nftService = new NftService();

router.post("/display", async function (req, res) {
  logger.http("POST /nft/display");
  logger.debug("req.body = " + JSON.stringify(req.body));
  const { statusCode, responseBody } = await nftService.displayMyNft(
    req.body.tokenId,
    req.body.scale,
    req.body.position,
    req.body.positionXYZ,
    req.body.galleryId,
    req.body.oa,
    req.body.metadata,
    req.body.rotation
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.put("/display/change", async function (req, res) {
  logger.http("PUT /nft/display/change");
  logger.debug("req.body = " + JSON.stringify(req.body));
  const { statusCode, responseBody } = await nftService.updateDisplayInfo(
    req.body.nftId,
    req.body.scale,
    req.body.position,
    req.body.positionXYZ,
    req.body.metadata,
    req.body.rotation
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/display", async function (req, res) {
  logger.http("GET /nft/display");

  const { statusCode, responseBody } = await nftService.getDisplayedNftList(
    req.query.galleryId
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.delete("/display", async function (req, res) {
  logger.http("DELETE /nft/display");
  logger.debug("req.body = " + JSON.stringify(req.body));
  const { statusCode, responseBody } = await nftService.deleteNft(
    req.body.nftId
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
