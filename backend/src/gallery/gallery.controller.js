const express = require("express");
const router = express.Router();
const logger = require("../../config/log");
const thumbnail = require("../../config/thumbnail");
const GallerysService = require("./gallery.service");
const GalleryService = new GallerysService();
// const fs = require("fs");
// const path = require("path");

// // 이미지 저장을 위한 multer
// const multer = require("multer");
// const _storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // console.log("12: _storage, destination");
//     // console.log("========== req.body ==========");
//     // console.log(req.body);
//     // console.log("==============================");
//     // console.log("========== file ==========");
//     // console.log(file);
//     // console.log("==============================");
//     // console.log("directory path = " + BASE_THUMBNAIL_PATH + "/" + req.body.oa);
//     // 우선 저장하고자하는 폴더에 사진이 있는지 확인
//     const directoryExist = fs.existsSync(
//       path.resolve(BASE_THUMBNAIL_PATH, req.body.oa)
//     );
//     // console.log("directoryExist = " + directoryExist);
//     // console.log(path.resolve("/tmp/space109", req.body.oa));
//     if (!directoryExist) {
//       // console.log("해당 디렉토리가 없음");
//       // console.log("디렉토리 생성");
//       fs.mkdirSync(path.resolve(BASE_THUMBNAIL_PATH, req.body.oa), {
//         recursive: true,
//       });
//       // console.log(
//       //   "폴더 생성 확인 = " +
//       //     fs.existsSync(path.resolve("/tmp/space109", req.body.oa))
//       // );
//     }
//     cb(null, path.resolve(BASE_THUMBNAIL_PATH, req.body.oa));
//   },
//   filename: function (req, file, cb) {
//     // console.log("파일명 지정");
//     // const filetype = "." + file.mimetype.substr(6);
//     cb(null, "thumbnail" + ".jpg");
//   },
// });

// const _fileFilter = (req, file, cb) => {
//   // mime type 체크하여 원하는 타입만 필터링
//   if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
//     cb(null, true);
//   } else {
//     cb({ msg: "file type is not png, jpg, jpeg " }, false);
//   }
// };

// var upload = multer({ storage: _storage, fileFilter: _fileFilter }).single(
//   "thumbnail"
// );

router.get("/", async function (req, res) {
  logger.http("GET /gallery");
  const { statusCode, responseBody } = await GalleryService.categoryList();

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/list", async function (req, res) {
  logger.http("GET /gallery/list");
  const { statusCode, responseBody } = await GalleryService.listAll();

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/theme", async function (req, res) {
  logger.http("GET /gallery/theme");
  logger.debug("theme = " + req.query["theme"]);
  const { statusCode, responseBody } = await GalleryService.listByCategory(
    req.query["theme"]
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/my", async function (req, res) {
  logger.http("GET /gallery/my");
  logger.debug("oa = " + req.query["oa"]);
  const { statusCode, responseBody } = await GalleryService.getMyGalleryInfo(
    req.query["oa"]
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.put("/my", async function (req, res) {
  logger.http("PUT /gallery/my");
  // 이미지가 들어와있지않으면
  // [Object: null prototype] {
  //   oa: '0xa15492067B5858d6B99E85E097dc30232b06854b',
  //   category_id: '1',
  //   description: '1',
  //   title: '1',
  //   thumbnail: ''
  // }
  // 이미지가 들어와있으면
  // [Object: null prototype] {
  //   oa: '0xa15492067B5858d6B99E85E097dc30232b06854b',
  //   category_id: '1',
  //   description: '1',
  //   title: '1'
  // }
  logger.debug("req.body = " + JSON.stringify(req.body));

  thumbnail(req, res, async (err) => {
    // console.log("upload init");
    // console.log(req.body);
    if (err || req.body.thumbnail == "") {
      logger.error(err ? err.msg : "thumbnail is empty");
      res.statusCode = 200;
      res.send({
        result: "fail",
        data: 0,
      });
    }
    console.log("req.body = " + JSON.stringify(req.body));
    let thumbnailPath =
      "/image/thumbnail" + "/" + req.body.oa + "/" + "thumbnail" + ".jpg";
    if (req.body.thumbnail != "" && req.body.thumbnail != undefined) {
      thumbnailPath = req.body.thumbnail;
    }
    // console.log(thumbnailPath);
    logger.debug("req.body = " + JSON.stringify(req.body));
    const { statusCode, responseBody } = await GalleryService.updateMyGallery(
      req.body.oa,
      req.body.category_id,
      req.body.description,
      req.body.title,
      thumbnailPath,
      req.body.isOpen
    );
    // console.log("await 나옴");
    res.statusCode = statusCode;
    res.send(responseBody);
  });
});

router.post("/guestbook", async function (req, res) {
  logger.http("POST /gallery/guestbook");
  logger.debug("req.body = " + JSON.stringify(req.body));
  const { statusCode, responseBody } = await GalleryService.writeGuestbook(
    req.body.galleryId,
    req.body.nickname,
    req.body.description
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/guestbook/finalPageNo", async function (req, res) {
  logger.http("GET /gallery/guestbook/totalPageNo");
  logger.debug("req.query = " + JSON.stringify(req.query));
  // page size
  let countPerPage = req.query["countPerPage"];
  if (
    countPerPage == undefined ||
    typeof countPerPage == "undefined" ||
    countPerPage == null ||
    Number.isNaN(parseInt(countPerPage))
  ) {
    countPerPage = 10;
  } else {
    countPerPage = parseInt(countPerPage);
  }
  const { statusCode, responseBody } =
    await GalleryService.getGuestbookFinalPageNo(
      req.query["galleryId"],
      countPerPage
    );

  res.statusCode = statusCode;
  res.send(responseBody);
});

router.get("/guestbook", async function (req, res) {
  logger.http("GET /gallery/guestbook");
  logger.debug("req.params = " + JSON.stringify(req.query));
  // page size
  let countPerPage = req.query["countPerPage"];
  // page number
  let currentPage = req.query["currentPage"];
  if (
    countPerPage == undefined ||
    typeof countPerPage == "undefined" ||
    countPerPage == null ||
    Number.isNaN(parseInt(countPerPage))
  ) {
    countPerPage = 10;
  } else {
    countPerPage = parseInt(countPerPage);
  }
  if (
    currentPage == undefined ||
    typeof currentPage == "undefined" ||
    currentPage == null ||
    Number.isNaN(parseInt(currentPage))
  ) {
    currentPage = 1;
  } else {
    currentPage = parseInt(currentPage);
  }
  const { statusCode, responseBody } = await GalleryService.guestbookList(
    req.query["galleryId"],
    countPerPage,
    currentPage
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
