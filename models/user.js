const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  spotifyId: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;
