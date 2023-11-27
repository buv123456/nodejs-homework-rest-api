const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  isValidObjectId(req.params.contactId)
    ? next()
    : next(HttpError(404, `${req.params.contactId} is not valid id`));
};

module.exports = isValidId;
