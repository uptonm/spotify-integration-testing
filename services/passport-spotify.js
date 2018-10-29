const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const axios = require("axios");

const User = mongoose.model("users");
const Song = mongoose.model("songs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENT,
      clientSecret: process.env.SPOTIFYSECRET,
      callbackURL: "/auth/spotify/callback",
      proxy: true
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const currentSong = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      let track = currentSong.data.items[0].track;
      let trackId = track.id;
      const recentlyPlayed = await new Song({
        spotifyId: track.id,
        artist: track.album.artists[0].name,
        album: track.album.name,
        title: track.name,
        albumArt: track.album.images[0].url,
        albumLink: track.album.external_urls.spotify
      });
      const existingTrack = await Song.findOne({ spotifyId: trackId });
      if (!existingTrack) {
        await recentlyPlayed.save();
      }
      // Check if user already exists in database, prevents duplicate documents
      const existingUser = await User.findOne({ spotifyId: profile.id });
      if (existingUser) {
        const res = await User.findByIdAndUpdate(existingUser._id, {
          recentlyPlayed
        });
        return done(null, existingUser);
      }
      const user = await new User({
        first: profile.displayName
          .split(" ")
          .slice(0, -1)
          .join(" "),
        last: profile.displayName
          .split(" ")
          .slice(-1)
          .join(" "),
        profileImage: profile.photos.length === 0 ? "" : profile.photos[0],
        profileLink: profile.profileUrl,
        spotifyId: profile.id,
        followers: profile.followers,
        recentlyPlayed
      }).save();
      done(null, user);
    }
  )
);
