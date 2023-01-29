const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.addUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    return res.json({
      name: user.name,
      id: user._id,
      phone: user.phone,
    });
  });
};

exports.loginUser = (req, res) => {
  const { phone, password } = req.body;
  console.log(phone, password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ phone }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER phone does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Phone and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, phone, orders } = user;
    return res.json({ token, user: { _id, name, phone, orders } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User Signout successfully!",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id; //profile is being set up from the front end and auth is being set above
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
