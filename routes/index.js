const bodyParser = require("body-parser");
const { AuthorController } = require("../controllers");
const { AuthorValidator } = require("../middlewares");
const middlewares = require("../auth/middlewares");
const userRoutes = require("./user");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.get("/author", [middlewares.bearer], AuthorController.index);
  app.post(
    "/author",
    [middlewares.bearer, AuthorValidator.validate()],
    AuthorController.store
  );
  app.put("/author/:id", [middlewares.bearer], AuthorController.update);
  app.delete("/author/:id", [middlewares.bearer], AuthorController.delete);
};
