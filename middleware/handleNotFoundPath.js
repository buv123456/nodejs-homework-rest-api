const handleNotFoundPath = (req, res, next) => {
  res.status(404);
  res.json({
    message: "This route does not exist, please check the documentation",
  });
};

module.exports = handleNotFoundPath;
