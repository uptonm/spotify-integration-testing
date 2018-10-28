const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      showDialog: true,
      scope: ["user-read-currently-playing"]
    })
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      // Does user exist?/ are they logged in?
      res.send(req.user);
    } else {
      res.send("Please Login");
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // User logs out, bring them back to the home page
  });
};
