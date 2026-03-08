const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getAllUsers       
} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

module.exports = router;
