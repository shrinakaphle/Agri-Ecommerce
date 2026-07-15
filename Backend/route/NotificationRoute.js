const express=require("express");

const router=express.Router();

const{

fetchNotifications,

readNotification,

readAllNotifications,

fetchAdminNotifications,
 readAllAdminNotifications
}=require("../controller/NotificationController");

// ==========================
// USER NOTIFICATIONS
// ==========================

router.get(

"/user/:id",

fetchNotifications

);

// ==========================
// READ ONE
// ==========================

router.put(

"/read/:id",

readNotification

);

// ==========================
// READ ALL
// ==========================

router.put(

"/read-all/:id",

readAllNotifications

);
router.get(

"/admin",

fetchAdminNotifications

);
router.put(

  "/read-all/admin",

  readAllAdminNotifications

);

module.exports=router;