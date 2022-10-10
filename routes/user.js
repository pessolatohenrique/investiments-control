const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { UserValidator } = require("../business");
const middlewares = require("../auth/middlewares");

const router = Router();

router.route("/login").post(middlewares.local, UserController.login);
router.route("/refresh_token").post(middlewares.refresh, UserController.login);
router.post("/user", [UserValidator.validate()], UserController.store);

module.exports = router;
