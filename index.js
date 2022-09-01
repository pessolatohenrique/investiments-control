const express = require("express");
const app = express();
const routes = require("./routes");
const { DatabaseConnection } = require("./config");
// necessary to load strategies
const { strategies } = require("./auth/strategies");

require("dotenv").config();

app.listen(3000, () => {
  console.log("Server Started");
  console.log("Example from dotenv: ", process.env.DB_USER);
});

DatabaseConnection.configure();
routes(app);

module.exports = app;
