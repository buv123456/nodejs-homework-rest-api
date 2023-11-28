const { isValidObjectId } = require("mongoose");
const HttpError = require("../utils/helpers/HttpError");

const isValidId = (req, res, next) => {
  isValidObjectId(req.params.contactId)
    ? next()
    : next(new HttpError(404, `Id: ${req.params.contactId} is not valid id`));
};

module.exports = isValidId;
