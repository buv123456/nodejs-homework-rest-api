const jwt = require("jsonwebtoken");
const HttpError = require("../utils/helpers/HttpError");
const User = require("../models/User");
const controllerWrapper = require("../utils/decorators/controller-wrapper");
require("dotenv/config");

const { JWT_SECRET } = process.env;

const authenticate = controllerWrapper(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpError(401, "Autorization header not found");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new HttpError(401, "missing Bearer");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token)
      throw new HttpError(401, "user not authorized or not found");
    req.user = user;
    next();
  } catch (err) {
    throw new HttpError(401, err.message);
  }
});

module.exports = authenticate;
