const express = require("express");
const router = express.Router();
const { home, register, login, user } = require("../controllers/auth-controller");
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware")

router.route("/").get(home);
router.route("/register").post(validate(signUpSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware, user);

module.exports = router;
