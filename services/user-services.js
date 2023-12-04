const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const HttpError = require("../utils/helpers/HttpError");
const User = require("../models/User");
const saveAvatarFS = require("../utils/helpers/save-avatar-fs");
const { JWT_SECRET, ACSSES_TOKEN_EXPIRED_TIME } = process.env;

const registerService = async ({ body }) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) throw new HttpError(409, "Email already exist");

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, {
    protocol: "http",
    s: "250",
    d: "monsterid",
  });

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
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

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACSSES_TOKEN_EXPIRED_TIME,
  });

  const authUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return {
    token: authUser.token,
    user: { email: authUser.email, subscription: authUser.subscription },
  };
};

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

const updateService = async (id, body, file) => {
  if (file) {
    const avatarURL = await saveAvatarFS(file);
    body = { ...body, avatarURL };
  }
  const user = await User.findByIdAndUpdate(id, body, { new: true });

  return { email: user.email, subscription: user.subscription };
};

const updateAvatar = async (id, body, file) => {
  const avatarURL = await saveAvatarFS(file);
  const user = await User.findByIdAndUpdate(
    id,
    { ...body, avatarURL },
    { new: true }
  );

  return { email: user.email, avatarURL: user.avatarURL };
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateService,
  updateAvatar,
};
