const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");

const {
  addProduct,
  getProducts,
  getSingleProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct
} = require("../controller/productController");

router.post(
  "/create",
  upload.single("image"),
  addProduct
);

router.get("/all", getProducts);

router.get(
  "/category/:id",
  getProductsByCategory
);

router.get("/:id", getSingleProduct);

router.put(
  "/update/:id",
  upload.single("image"),
  updateProduct
);

router.delete(
  "/delete/:id",
  deleteProduct
);

module.exports = router;