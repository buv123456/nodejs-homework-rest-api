const HttpError = require("../utils/helpers/HttpError");

const isFileInReq = async (req, res, next) => {
  req.file
    ? next()
    : next(
        new HttpError(400, "File must be attached!")
      );
};

module.exports = isFileInReq;
