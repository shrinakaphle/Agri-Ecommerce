const express =
require("express");

const router =
express.Router();

const {
  addCartDB,
  getCartDB,
  updateCartDB,
  deleteCartDB
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

module.exports =
router;