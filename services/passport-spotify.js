const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENT,
      clientSecret: process.env.SPOTIFYSECRET,
      callbackURL: "http://localhost:8888/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
      return done(profile);
    }
  )
);
