const HttpError = require("../utils/helpers/HttpError");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  error ? next(new HttpError(422, error.message)) : next();
};

module.exports = validateBody;
