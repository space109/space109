const fs = require("fs");
const path = require("path");
const BASE_THUMBNAIL_PATH = process.env.BASE_THUMBNAIL_PATH;
// 이미지 저장을 위한 multer
const multer = require("multer");
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("12: _storage, destination");
    // console.log("========== req.body ==========");
    // console.log(req.body);
    // console.log("==============================");
    // console.log("========== file ==========");
    // console.log(file);
    // console.log("==============================");
    // console.log("directory path = " + BASE_THUMBNAIL_PATH + "/" + req.body.oa);
    // 우선 저장하고자하는 폴더에 사진이 있는지 확인
    const directoryExist = fs.existsSync(
      path.resolve(BASE_THUMBNAIL_PATH, req.body.oa)
    );
    // console.log("directoryExist = " + directoryExist);
    // console.log(path.resolve("/tmp/space109", req.body.oa));
    if (!directoryExist) {
      // console.log("해당 디렉토리가 없음");
      // console.log("디렉토리 생성");
      fs.mkdirSync(path.resolve(BASE_THUMBNAIL_PATH, req.body.oa), {
        recursive: true,
      });
      // console.log(
      //   "폴더 생성 확인 = " +
      //     fs.existsSync(path.resolve("/tmp/space109", req.body.oa))
      // );
    }
    cb(null, path.resolve(BASE_THUMBNAIL_PATH, req.body.oa));
  },
  filename: function (req, file, cb) {
    // console.log("파일명 지정");
    // const filetype = "." + file.mimetype.substr(6);
    cb(null, "thumbnail" + ".jpg");
  },
});

const _fileFilter = (req, file, cb) => {
  // mime type 체크하여 원하는 타입만 필터링
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb({ msg: "file type is not png, jpg, jpeg " }, false);
  }
};

var upload = multer({ storage: _storage, fileFilter: _fileFilter }).single(
  "thumbnail"
);

module.exports = upload;
