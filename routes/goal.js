const { Router } = require("express");
const GoalController = require("../controllers/GoalController");
const GoalValidator = require("../middlewares/GoalValidator");

const middlewares = require("../auth/middlewares");

const router = Router();

router.get("/goal", [middlewares.bearer], GoalController.index);
router.get("/goal/:id", [middlewares.bearer], GoalController.show);
router.post(
  "/goal",
  [middlewares.bearer, GoalValidator.validate()],
  GoalController.store
);
router.put("/goal/:id", [middlewares.bearer], GoalController.update);
router.delete("/goal/:id", [middlewares.bearer], GoalController.delete);

module.exports = router;
