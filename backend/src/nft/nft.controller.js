const express = require("express");
const router = express.Router();
const NftService = require("./nft.service");
const nftService = new NftService();

router.post("/sell", async function (req, res) {
  const { statusCode, responseBody } = await nftService.sellMyNft(
    req.body.toeknId,
    req.body.scale,
    req.body.position,
    req.body.galleryId,
    req.body.oa
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.put("/display/change", async function(req, res){
  const { statusCode, responseBody } = await nftService.updateDisplayInfo(
    req.body.nftId, 
    req.body.scale, 
    req.body.position
    );
  console.log(req.body);
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/display", async function(req, res){
  // console.log("들어옴");
  // console.log(req.query.galleryId);
  const { statusCode, responseBody } = await nftService.getDisplayedNftList(
    req.query.galleryId
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

router.delete("/sell", async function(req, res){
  const { statusCode, responseBody } = await nftService.deleteSoldNft(
    req.body.nftId
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
