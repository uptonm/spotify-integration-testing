const mongoose = require("mongoose");
const { Schema } = mongoose;
const { songSchema } = require("./song");

const userSchema = new Schema({
  first: String,
  last: String,
  spotifyId: String,
  profileImage: String,
  profileLink: String,
  followers: Number,
  recentlyPlayed: songSchema
});

const User = mongoose.model("users", userSchema);

module.exports = User;
