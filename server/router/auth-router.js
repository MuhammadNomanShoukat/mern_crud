const express = require("express");
const router = express.Router();
const { home, register, login } = require("../controllers/auth-controller");
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(home);
router.route("/register").post(validate(signUpSchema), register);
router.route("/login").post(validate(loginSchema), login);

module.exports = router;
