const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

const {
  DatabaseConnection,
  KafkaConnection,
  SwaggerConnection,
} = require("./config");
// necessary to load strategies
const { strategies } = require("./auth/strategies");

require("dotenv").config();

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server Started"));
}

app.use(cors());
app.use(async (error, req, res, next) => {
  res.status(error.getStatusCode()).json(error);
  return next();
});

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

DatabaseConnection.configure();
KafkaConnection.configure();
SwaggerConnection.configure(app);
routes(app);

module.exports = app;
