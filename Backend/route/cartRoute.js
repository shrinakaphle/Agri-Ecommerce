const express =
require("express");

const router =
express.Router();

const {
  addCartDB,
  getCartDB,
  updateCartDB,
  deleteCartDB,
  clearCart
} = require(
  "../controller/cartController"
);

router.post(
  "/add",
  addCartDB
);

router.get(
  "/:user_id",
  getCartDB
);

router.put(
  "/update/:id",
  updateCartDB
);

router.delete(
  "/delete/:id",
  deleteCartDB
);

router.delete(
  "/clear/:id",
  clearCart
);


module.exports =
router;