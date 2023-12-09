const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const HttpError = require("../utils/helpers/HttpError");
const User = require("../models/User");
const saveAvatarFS = require("../utils/helpers/save-avatar-fs");
const sendEmail = require("../utils/helpers/send-email");
const { JWT_SECRET, ACSSES_TOKEN_EXPIRED_TIME, BASE_URL, PORT } = process.env;
// ______________________________________________

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

  const verificationToken = nanoid();
  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail({
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};
// ______________________________________________

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw new HttpError(401, "Email not verified");
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
// ______________________________________________

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};
// ______________________________________________

const updateService = async (id, body, file) => {
  if (file) {
    const avatarURL = await saveAvatarFS(file);
    body = { ...body, avatarURL };
  }
  const user = await User.findByIdAndUpdate(id, body, { new: true });

  return { email: user.email, subscription: user.subscription };
};
// ______________________________________________

const updateAvatar = async (id, body, file) => {
  const avatarURL = await saveAvatarFS(file);
  const user = await User.findByIdAndUpdate(
    id,
    { ...body, avatarURL },
    { new: true }
  );

  return { email: user.email, avatarURL: user.avatarURL };
};
// ______________________________________________

const verifyUser = async ({ verificationToken }) => {
  const user = await User.findOne(verificationToken);

  if (!user) {
    throw new HttpError(401, "User not found or invalid verification token");
  }
  if (user.verify) {
    throw new HttpError(401, "Email already verified");
  }

  await User.updateOne(verificationToken, {
    verify: true,
    verificationToken: null,
  });

  return { message: "Verification successful" };
};
// _____________________________________________

const resendVerify = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "User not found");
  }
  if (user.verify) {
    throw new HttpError(401, "Email already verified");
  }

  await sendEmail({
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  });

  return { message: "Verification email sent" };
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateService,
  updateAvatar,
  verifyUser,
  resendVerify,
};
