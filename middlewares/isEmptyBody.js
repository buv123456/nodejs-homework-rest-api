const HttpError = require("../utils/helpers/HttpError");

const isEmptyBody = async (req, res, next) => {
  Object.keys(req.body).length
    ? next()
    : next(new HttpError(400, "Body must have fields "));
};

module.exports = isEmptyBody;
