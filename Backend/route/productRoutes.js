const express =
  require("express");

const router =
  express.Router();

const upload =
  require(
    "../middleware/uploads"
  );

const {
  addProduct,
  fetchProducts,
  fetchProductsByCategory,
  fetchProduct,
  editProduct,
  removeProduct,
} = require(
  "../controller/productController"
);

// CREATE PRODUCT
router.post(
  "/",
  upload.single("image"),
  addProduct
);

// GET ALL PRODUCTS
router.get(
  "/",
  fetchProducts
);

// GET PRODUCTS BY CATEGORY
router.get(
  "/category/:id",
  fetchProductsByCategory
);

// GET SINGLE PRODUCT
router.get(
  "/:id",
  fetchProduct
);

// UPDATE PRODUCT
router.put(
  "/:id",
  upload.single("image"),
  editProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  removeProduct
);

module.exports = router;