const mongoose = require("mongoose");
const { Schema } = mongoose;

const songSchema = new Schema({
  spotifyId: String,
  artist: String,
  album: String,
  title: String,
  albumArt: String,
  albumLink: String
});

const Song = mongoose.model("songs", songSchema);

module.exports = { Song, songSchema };
