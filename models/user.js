const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first: String,
  last: String,
  spotifyId: String,
  profileImage: String,
  profileLink: String,
  followers: Number
});

const User = mongoose.model("users", userSchema);

module.exports = User;
