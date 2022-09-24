const createError = require("http-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./config/log");

// const itemsRouter = require("./src/items/items.controller");
// const salesRouter = require("./src/sales/sales.controller");
const walletRouter = require("./src/wallet/wallet.controller");
const nftRouter = require("./src/nft/nft.controller");
const galleryRouter = require("./src/gallery/gallery.controller");

const app = express();

app.use(helmet());
app.use(cors());
// 로그 결정
if (process.env.DB_HOST == "localhost") {
  // 개발환경일때다
  app.use(morgan("tiny", { stream: logger.stream }));
} else {
  // 배포환경일때
  app.use(morgan("tiny"), { stream: logger.stream });
}
// error, warn, info, http, verbose, debug, silly
// logger.log("info", "app started");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/items", itemsRouter);
// app.use("/sales", salesRouter);
app.use("/wallet", walletRouter);
app.use("/nft", nftRouter);
app.use("/gallery", galleryRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404);
  res.send(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
