const { check, validationResult } = require("express-validator");

var express = require("express");
var router = express.Router();
const {
  signout,
  addUser,
  loginUser,
  isSignedIn,
} = require("../controllers/auth");

router.post(
  "/add-user",
  [
    check("name", "name should be atleast 3 characters!").isLength({ min: 3 }),
    check("phone", "correct phone number is required").isMobilePhone(),
    check("password", "password should be atleast 3 char!").isLength({
      min: 3,
    }),
  ],
  addUser
);

router.post(
  "/login-user",
  [
    check("phone", "proper mobile is required").isMobilePhone(),
    check("password", "password field is required!").isLength({ min: 1 }),
  ],
  loginUser
);

router.get("/logout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
