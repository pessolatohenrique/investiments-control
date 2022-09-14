const bodyParser = require("body-parser");
const userRoutes = require("./user");
const investimentRoutes = require("./investiment");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(investimentRoutes);
};
