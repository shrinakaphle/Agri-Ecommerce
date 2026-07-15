const {

  createNotification,

  getNotificationsByUser,

  markAsRead,

  markAllRead,
  
    markAllAdminNotificationsRead


} = require("../model/NotificationModel");

// =============================
// GET USER NOTIFICATIONS
// =============================

const fetchNotifications = async (req,res)=>{

  try{

    const {id}=req.params;

    const notifications=

      await getNotificationsByUser(id);

    res.status(200).json({

      success:true,

      notifications

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// =============================
// MARK ONE READ
// =============================

const readNotification=async(req,res)=>{

  try{

    const {id}=req.params;

    const notification=

      await markAsRead(id);

    res.status(200).json({

      success:true,

      notification

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// =============================
// MARK ALL READ
// =============================

const readAllNotifications=async(req,res)=>{

  try{

    const {id}=req.params;

    await markAllRead(id);

    res.status(200).json({

      success:true,

      message:"All notifications marked as read"

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
const {

  getAdminNotifications

} = require("../model/NotificationModel");

const fetchAdminNotifications = async (req,res)=>{

  try{

    const notifications =

      await getAdminNotifications();

    res.status(200).json({

      success:true,

      notifications

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
const readAllAdminNotifications = async (req, res) => {

  try {

    await markAllAdminNotificationsRead();

    res.status(200).json({

      success: true,

      message: "All admin notifications marked as read"

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports={

  fetchNotifications,

  readNotification,

  readAllNotifications,

  createNotification,
  fetchAdminNotifications,
    readAllAdminNotifications


};