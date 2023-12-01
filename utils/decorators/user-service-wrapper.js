const HttpError = require("../helpers/HttpError");

const userServiceWrapper = (service) => async (req) => {
  const _id = req.params.contactId;
  const owner = req.user._id;
  const result = await service(_id, owner, req);
  if (!result) {
    throw new HttpError(404, `Contact with id:${_id} not found`);
  }
  return result;
};

module.exports = userServiceWrapper;
