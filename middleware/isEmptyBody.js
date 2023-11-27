const HttpError = require("../helpers/HttpError");

const isEmptyBody = async (req, res, next) => {
  !Object.keys(req.body).length
    ? next(new HttpError(400, "Body must have fields"))
    : next();
};

module.exports = isEmptyBody;
