const serviceWrapper = (service) => async (req, res) => {
  const ids = { _id: req.params.contactId, owner: req.user._id };
  const result = await service(ids, req);
  return result;
};

module.exports = serviceWrapper;
