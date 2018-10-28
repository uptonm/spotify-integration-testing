const mongoose = require("mongoose");
const error = require("./errors");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  const exists = await User.find({});
  if (exists) {
    return res.status(200).send(exists);
  }
  return res.status(404).send(error[404]);
};
