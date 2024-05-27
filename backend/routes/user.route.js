const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/auth.controller");
const { userDetails } = require("../controllers/user.controller");

router.get("/user-details", authenticateToken, userDetails);

module.exports = router;
