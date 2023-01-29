const express = require("express");
const router = express.Router();
const { getUserById, getUser } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById); //This will populate the req.profile

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.get("/users", getAllUsers);

module.exports = router;
