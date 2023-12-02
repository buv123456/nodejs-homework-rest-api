const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const HttpError = require("./HttpError");

const avatarPath = path.resolve("public", "avatars");

const saveAvatarFS = async ({ path: oldPath, filename }) => {
  const newPath = path.join(avatarPath, filename);
  await Jimp.read(oldPath)
    .then((image) =>
      image
        .autocrop()
        .cover(
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(newPath)
    )
    .catch((err) => {
      throw new HttpError(500, err.message);
    });
  await fs.unlink(oldPath);
  return path.join("avatars", filename);
};

module.exports = saveAvatarFS;
