const { Router } = require("express");
const StatisticController = require("../controllers/StatisticController");
const { StatisticQueryValidator } = require("../business");
const middlewares = require("../auth/middlewares");

const router = Router();

router.get(
  "/statistic/group",
  [middlewares.bearer, StatisticQueryValidator.validate()],
  StatisticController.group
);

module.exports = router;
