const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");

const {
  addCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require("../controller/categoryController");

router.post(
  "/create",
  upload.single("image"),
  addCategory
);

router.get(
  "/all",
  getCategories
);

router.get(
  "/:id",
  getSingleCategory
);

router.put(
  "/update/:id",
  upload.single("image"),
  updateCategory
);

router.delete(
  "/delete/:id",
  deleteCategory
);

module.exports = router;