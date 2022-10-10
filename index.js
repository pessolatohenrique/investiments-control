const express = require("express");
const app = express();
const routes = require("./routes");

const { DatabaseConnection, KafkaConfig } = require("./config");
// necessary to load strategies
const { strategies } = require("./auth/strategies");

require("dotenv").config();

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server Started"));
}

app.use(async (error, req, res, next) => {
  res.status(error.getStatusCode()).json(error);
  return next();
});

DatabaseConnection.configure();
KafkaConfig.configure();
routes(app);

module.exports = app;
