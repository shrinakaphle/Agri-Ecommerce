const express= require("express");

const router = express.Router();

const upload = require("../middleware/uploads" );

const {
  fetchCategories,
  addCategory,
  editCategory,
} = require( "../controller/categoryController"
);

router.get( "/", fetchCategories
);

router.post("/",upload.single("image"),
  addCategory
);
router.put("/:id",upload.single("image"),editCategory);

module.exports = router;