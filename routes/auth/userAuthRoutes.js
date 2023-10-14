const express = require("express");
const authController = require("../../controllers/auth");
const { validateBody } = require("../../midlewares");
const { registerSchema, loginSchema } = require("../../schemas");

const router = express.Router();

router.post("/register", validateBody(registerSchema), authController.register);

router.post("/login", validateBody(loginSchema), authController.login);

module.exports = router;
