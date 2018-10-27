const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENT,
      clientSecret: process.env.SPOTIFYSECRET,
      callbackURL: "http://localhost:8888/auth/spotify/callback"
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const existingUser = await User.findOne({ spotifyId: profile.id });
      if (existingUser) {
        // We already have a record with the given profile id
        //console.log('We already have a user with this id'); //Test
        return done(null, existingUser);
      } // We don't have a user record with this id, make a new record
      const user = await new User({
        name: profile.displayName,
        spotifyId: profile.id
      }).save();
      done(null, user);
    }
  )
);
