const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  authenticateToken,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/delete-account", authenticateToken, deleteUser);

module.exports = router;
