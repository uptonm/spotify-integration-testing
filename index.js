const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

require("./models/user");
require("./services/passport-spotify");

mongoose.connect(
  process.env.DBURI,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxDays: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

require("./routes/spotify.auth.routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
