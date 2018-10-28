const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

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
      const existingUser = await User.findOne({ spotifyId: profile.id });
      if (existingUser) {
        // We already have a record with the given profile id
        //console.log('We already have a user with this id'); //Test
        return done(null, existingUser);
      } // We don't have a user record with this id, make a new record
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
        followers: profile.followers
      }).save();
      done(null, user);
    }
  )
);
