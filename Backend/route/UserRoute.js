const express =require("express");
const router =express.Router();

const {addUser,login,getallUserFromTheDB,getUserByIDDB,getUpdateByIDDB,getUserdeleteByIDDB

}=require("../controller/UserController");

router.post("/create",addUser);
router.post("/login",login);
router.get("/getAll",getallUserFromTheDB);
router.get("/getUserById/:id",getUserByIDDB);
router.put("/updateById/:id",getUpdateByIDDB);
router.delete("/deleteById/:id",getUserdeleteByIDDB);
module.exports =router;