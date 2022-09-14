const express = require("express");
const router = express.Router();
const WalletsService = require("./wallet.service");
const walletService = new WalletsService();

router.post("/", async function (req, res) {
  const { statusCode, responseBody } = await walletService.searchWallet(
    req.body.oa
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/check", async function (req, res) {
  const { statusCode, responseBody } = await walletService.checkNickname(
    req.body.nickname
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.post("/join", async function (req, res) {
  const { statusCode, responseBody } = await walletService.insert(
    req.body.oa,
    req.body.nickname
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
