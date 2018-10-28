const actions = require("../controllers/user");

module.exports = app => {
  app.get("/api/users", actions.get);
};
