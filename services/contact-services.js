const gravatar = require("gravatar");
const Contact = require("../models/Contact");
const userServiceWrapper = require("../utils/decorators/user-service-wrapper");
const saveAvatarFS = require("../utils/helpers/save-avatar-fs");

const getAllService = async (req) => {
  const { id } = req.user;
  const { page = 1, limit = 20, ...filters } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner: id, ...filters },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  return contacts;
};

const getByIdService = userServiceWrapper(
  async (_id, owner) =>
    await Contact.findOne({ _id, owner }, "-updatedAt -createdAt").populate(
      "owner",
      "email"
    )
);

const addService = async (req) => {
  const avatarURL = req.file
    ? await saveAvatarFS(req.file)
    : gravatar.url(
        req.body.email,
        { s: "250", protocol: "http", d: "robohash" },
        false
      );
  const owner = req.user._id;
  const contact = await Contact.create({ ...req.body, owner, avatarURL });
  return contact;
};

const removeService = userServiceWrapper(
  async (_id, owner) => await Contact.findOneAndDelete({ _id, owner })
);

const updateService = userServiceWrapper(async (_id, owner, { body, file }) => {
  if (file) {
    const avatarURL = await saveAvatarFS(file);
    body = { ...body, avatarURL };
  }
  return await Contact.findOneAndUpdate({ _id, owner }, body);
});

module.exports = {
  getAllService,
  getByIdService,
  addService,
  removeService,
  updateService,
};
