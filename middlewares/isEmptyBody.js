const HttpError = require("../utils/helpers/HttpError");

const isEmptyBody = async (req, res, next) => {
  Object.keys(req.body).length || req.file
    ? next()
    : next(
        new HttpError(400, "Body must have fields or file must be attached!")
      );
};

module.exports = isEmptyBody;
