const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  deleteContact       
} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/user/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route("/user/:id").patch(authMiddleware, adminMiddleware, updateUserById);
router.route("/user/:id").delete(authMiddleware, adminMiddleware, deleteUserById);
router.route("/contact/:id").delete(authMiddleware, adminMiddleware, deleteContact);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

module.exports = router;
