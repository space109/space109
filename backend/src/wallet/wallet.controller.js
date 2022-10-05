const express = require("express");
const router = express.Router();
const logger = require("../../config/log");
const WalletsService = require("./wallet.service");
const walletService = new WalletsService();

router.post("/", async function (req, res) {
  logger.http("POST /wallet/");
  logger.debug("oa = " + req.body.oa);
  const { statusCode, responseBody } = await walletService.searchWallet(
    req.body.oa
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/check", async function (req, res) {
  logger.http("GET /wallet/check");
  logger.debug("nickname = " + req.query["nickname"]);
  const { statusCode, responseBody } = await walletService.checkNickname(
    req.query["nickname"]
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.post("/join", async function (req, res) {
  logger.http("POST /wallet/join");
  logger.debug("oa = " + req.body.oa + ", nickname = " + req.body.nickname);
  const { statusCode, responseBody } = await walletService.insert(
    req.body.oa,
    req.body.nickname
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.post("/count", async function (req, res) {
  logger.http("POST /wallet/count");
  logger.debug("gallery_id = " + req.body.gallery_id);
  const { statusCode, responseBody } = await walletService.count(
    req.body.gallery_id
  );
  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
