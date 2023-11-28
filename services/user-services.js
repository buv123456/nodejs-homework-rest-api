const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const HttpError = require("../utils/helpers/HttpError");
const User = require("../models/User");
const { JWT_SECRET } = process.env;

const registerService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw new HttpError(409, "Email already exist");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });

  return {
    email,
    subscription: newUser.subscription,
  };
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return token;
};

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
