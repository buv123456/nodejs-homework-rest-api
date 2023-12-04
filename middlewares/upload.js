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
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new HttpError(400, "Invalid file extention, must be image"));
};

const upload = multer({
  storage,
  limits: limit,
  fileFilter,
});

module.exports = upload;
