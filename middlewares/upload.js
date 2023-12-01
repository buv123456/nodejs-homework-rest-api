const multer = require("multer");
const path = require("path");
const HttpError = require("../utils/helpers/HttpError");

const destination = path.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const newFilename = `${Date.now()}_${Math.round(Math.random() * 1e9)}_${
      file.originalname
    }`;
    cb(null, newFilename);
  },
});

const limit = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(new HttpError(400, "Invalid file extention"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: limit,
  fileFilter,
});

module.exports = upload;
