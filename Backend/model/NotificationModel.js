const pool = require("../database/db");

// ==========================
// CREATE NOTIFICATION
// ==========================

const createNotification = async (
  user_id,
  receiver_type,
  title,
  message,
  order_id =null
) => {

  const result = await pool.query(

    `
    INSERT INTO notifications
    (user_id,receiver_type,title,message,order_id)

    VALUES ($1,$2,$3,$4,$5)

    RETURNING *
    `,

    [
      user_id,
      receiver_type,
      title,
      message,
      order_id
    ]

  );

  return result.rows[0];

};

// ==========================
// GET USER NOTIFICATIONS
// ==========================

const getNotificationsByUser = async (
  user_id
) => {

  const result = await pool.query(

    `
    SELECT *

    FROM notifications

    WHERE user_id = $1

    ORDER BY created_at DESC
    `,

    [user_id]

  );

  return result.rows;

};

// ==========================
// MARK SINGLE AS READ
// ==========================

const markAsRead = async (id) => {

  const result = await pool.query(

    `
    UPDATE notifications

    SET is_read = TRUE

    WHERE id = $1

    RETURNING *
    `,

    [id]

  );

  return result.rows[0];

};

// ==========================
// MARK ALL AS READ
// ==========================

const markAllRead = async (
  user_id
) => {

  await pool.query(

    `
    UPDATE notifications

    SET is_read = TRUE

    WHERE user_id = $1
    `,

    [user_id]

  );

};
const getAdminNotifications = async () => {

  const result = await pool.query(

    `
    SELECT *

    FROM notifications

    WHERE receiver_type='admin'

    ORDER BY created_at DESC
    `

  );

  return result.rows;

};

const markAllAdminNotificationsRead = async () => {

  await pool.query(

    `
    UPDATE notifications

    SET is_read = TRUE

    WHERE receiver_type = 'admin'

    AND is_read = FALSE
    `

  );

};



module.exports = {

  createNotification,

  getNotificationsByUser,

  markAsRead,

  markAllRead,

  getAdminNotifications,

  markAllAdminNotificationsRead


};