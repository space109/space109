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

// NFT를 구매했을때 그 NFT를 NFT 테이블에서 제거해주고 LOG테이블로 옮겨준다.
router.delete("/sell", async function (req, res) {
  logger.http("DELETE /nft/sell");
  logger.debug("req.query = " + JSON.stringify(req.query));
  const { statusCode, responseBody } = await nftService.sellNft(
    req.query["nftId"]
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.delete("/deleteFrame", async function (req, res) {
  logger.http("DELETE /nft/deleteFrame");
  logger.debug("req.body = " + JSON.stringify(req.body));
  const { statusCode, responseBody } = await nftService.deleteFrame(
    req.body.nftId
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
