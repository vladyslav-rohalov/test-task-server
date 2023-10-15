const express = require("express");
const { authenticate, isBoss, isValidId } = require("../../midlewares");
const userController = require("../../controllers/users");
const router = express.Router();

router.get("/", authenticate, userController.getAll);

router.patch(
  "/subordinate/:id",
  isValidId,
  authenticate,
  userController.subordinate
);

router.patch(
  "/change-boss/:id",
  isValidId,
  authenticate,
  isBoss,
  userController.changeBoss
);

module.exports = router;
