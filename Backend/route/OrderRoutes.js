const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrdersByUser,
  getOrderDetails
} = require("../controller/OrderController");


// ============================
// CREATE ORDER
// ============================

router.post(
  "/create",
  createOrder
);


// ============================
// GET USER ORDERS
// ============================

router.get(
  "/user/:id",
  getOrdersByUser
);


// ============================
// GET SINGLE ORDER DETAILS
// ============================

router.get(
  "/details/:id",
  getOrderDetails
);


module.exports = router;