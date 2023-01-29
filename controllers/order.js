const { Order } = require("../models/order");

exports.createOrder = (req, res) => {
  console.log("createOrder");
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find({ user: req.profile._id }).exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: "No orders found in DB",
      });
    }
    console.log(orders);
    res.json(orders);
  });
};

exports.getAllOrdersForUser = (req, res) => {
  //
};
