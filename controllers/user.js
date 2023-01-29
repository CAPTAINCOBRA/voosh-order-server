const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

// exports.getAllUsers = (req, res) => {
//   User.find({ User })
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => res.status(401).json({ error: "No User FOund" }));
// };

exports.pushOrderInPurchaseList = (req, res, next) => {
  console.log("pushOrderInPurchaseList");
  console.log(JSON.stringify(req.body));
  let newOrder = {};
  newOrder.user = req.body.user;
  newOrder.transaction_id = req.body.transaction_id;
  newOrder.amount = req.body.amount;
  newOrder.status = req.body.status;
  newOrder.productName = req.body.productName;
  newOrder.address = req.body.address;

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { orders: newOrder } },
    { new: true },
    (err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to purchase list",
        });
      }
      next();
    }
  );
  // next(); //For testing
};
