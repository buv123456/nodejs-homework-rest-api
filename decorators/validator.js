const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      return next(new HttpError(422, error.message));
    }
    next();
  };

  return fn;
};

module.exports = validateBody;
