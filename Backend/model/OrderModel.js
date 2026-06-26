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
    p.name,
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
    SELECT *
    FROM orders
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

};
module.exports = {
  createOrderDB,
  createOrderItemDB,
  getOrdersByUserDB,
  getOrderItemsDB,
  getOrderByIdDB
};