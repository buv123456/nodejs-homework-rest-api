// const Jimp = require("jimp");
// const HttpError = require("../utils/helpers/HttpError");

// const resizeImg = async (req, res, next) => {
//   if (!req.file) return next();

//   const image = await Jimp.read(req.file.buffer);
//   image.resize(250, 250);

//   // Оновіть буфер в запиті із модифікованими даними зображення
//   req.file.buffer = await image.getBufferAsync(Jimp.AUTO);

//   next();
// };

// module.exports = resizeImg;

// const resizeImages = async (req, res, next) => {
//   if (!req.files) return next();

//   req.body.images = [];
//   await Promise.all(
//     req.files.map(async (file) => {
//       const filename = file.originalname.replace(/\..+$/, "");
//       const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;

//       await sharp(file.buffer)
//         .resize(640, 320)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`upload/${newFilename}`);

//       req.body.images.push(newFilename);
//     })
//   );

//   next();
// };
