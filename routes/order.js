const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

const { createOrder, getAllOrders } = require("../controllers/order");

//params
router.param("userId", getUserById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  createOrder
);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, getAllOrders);

module.exports = router;
