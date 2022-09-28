const { Router } = require("express");
const InvestimentController = require("../controllers/InvestimentController");
const middlewares = require("../auth/middlewares");

const router = Router();

router.get("/investiment", [middlewares.bearer], InvestimentController.index);
router.get(
  "/investiment/:id",
  [middlewares.bearer],
  InvestimentController.show
);
router.post("/investiment", [middlewares.bearer], InvestimentController.store);
router.put(
  "/investiment/:id",
  [middlewares.bearer],
  InvestimentController.update
);
router.delete(
  "/investiment/:id",
  [middlewares.bearer],
  InvestimentController.delete
);

module.exports = router;
