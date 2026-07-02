const pool = require("../database/db");

// CREATE ORDER

const createOrderDB = async (
  user_id,
  total_amount,
  payment_method,
  payment_status,
  shipping_address
) => {

  const result = await pool.query(
    `
    INSERT INTO orders
    (
      user_id,
      total_amount,
      payment_method,
      payment_status,
      shipping_address,
      order_status
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      user_id,
      total_amount,
      payment_method,
      payment_status,
      shipping_address,
      "Processing"
    ]
  );

  return result.rows[0];

};

// CREATE ORDER ITEM

const createOrderItemDB = async (
  order_id,
  product_id,
  quantity,
  weight,
  price
) => {

  const result = await pool.query(
    `
    INSERT INTO order_items
    (
      order_id,
      product_id,
      quantity,
      weight,
      price
    )
    VALUES
    ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      order_id,
      product_id,
      quantity,
      weight,
      price
    ]
  );

  return result.rows[0];

};

// GET USER ORDERS

const getOrdersByUserDB = async (
  user_id
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user_id]
  );

  return result.rows;

};

// GET ORDER ITEMS

const getOrderItemsDB = async (
  order_id
) => {

  const result = await pool.query(
    `
    SELECT
    oi.*,
    p.name As product_name,
    p.image
    FROM order_items oi
    JOIN products p
    ON oi.product_id = p.id
    WHERE oi.order_id = $1
    `,
    [order_id]
  );

  return result.rows;

};
const getOrderByIdDB = async (id) => {

  const result = await pool.query(
    `
    SELECT
      orders.*,
      users.name,
      users.email
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    WHERE orders.id = $1
    `,
    [id]
  );

  return result.rows[0];

};

// ==============================
// GET ALL ORDERS (ADMIN)
// ==============================

const getAllOrders = async () => {

  const result = await pool.query(
    `
    SELECT
      orders.id,
      orders.user_id,
      orders.total_amount,
      orders.payment_method,
      orders.payment_status,
      orders.order_status,
      orders.created_at,
      users.name,
      users.email
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
    `
  );

  return result.rows;

};
// ==============================
// UPDATE ORDER STATUS
// ==============================

const updateOrderStatus = async (
  id,
  status
) => {

  const result = await pool.query(
    `
    UPDATE orders
    SET order_status = $1
    WHERE id = $2
    RETURNING *
    `,
    [
      status,
      id
    ]
  );

  return result.rows[0];

};

module.exports = {
  createOrderDB,
  createOrderItemDB,
  getOrdersByUserDB,
  getOrderItemsDB,
  getOrderByIdDB,
  getAllOrders,
 updateOrderStatus

};