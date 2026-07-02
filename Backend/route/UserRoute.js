const express =require("express");
const router =express.Router();
const upload =require("../middleware/uploads")

const {addUser,login,getallUserFromTheDB,getUserByIDDB,getUpdateByIDDB,getUserdeleteByIDDB, fetchCustomers,fetchCustomerDetails

}=require("../controller/UserController");

router.post("/create",addUser);
router.post("/login",login);
router.get("/getAll",getallUserFromTheDB);
router.get("/getUserById/:id",getUserByIDDB);
router.put("/updateById/:id",upload.single("profile"),getUpdateByIDDB);
router.delete("/deleteById/:id",getUserdeleteByIDDB);
router.get("/customers", fetchCustomers);
router.get("/customers/:id",fetchCustomerDetails);
module.exports =router;