const fs = require("fs/promises");
const path = require("path");

const avatarPath = path.resolve("public", "avatars");

const saveAvatarFS = async ({ path: oldPath, filename }) => {
  console.log("oldPa", oldPath);
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  return path.join("avatars", filename);
};

module.exports = saveAvatarFS;
