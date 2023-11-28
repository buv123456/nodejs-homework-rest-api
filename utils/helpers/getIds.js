const getIds = (req) => {
  return { _id: req.params.contactId, owner: req.user._id };
};

module.exports = getIds;
