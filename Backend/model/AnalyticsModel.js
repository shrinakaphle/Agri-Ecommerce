const pool = require("../database/db");

// ===============================
// MONTHLY SALES
// ===============================

const getMonthlySales = async () => {

  const result = await pool.query(`
    SELECT
      TO_CHAR(created_at,'Mon') AS month,
      SUM(total_amount)::INT AS revenue,
      COUNT(*)::INT AS orders
    FROM orders
    GROUP BY
      DATE_TRUNC('month', created_at),
      TO_CHAR(created_at,'Mon')
    ORDER BY
      DATE_TRUNC('month', created_at)
  `);

  return result.rows;

};

// ===============================
// ORDER STATUS
// ===============================

const getOrderStatus = async () => {

  const result = await pool.query(`
    SELECT
      order_status,
      COUNT(*)::INT AS total
    FROM orders
    GROUP BY order_status
  `);

  return result.rows;

};

// ===============================
// TOP SELLING PRODUCTS
// ===============================

const getTopProducts = async () => {

  const result = await pool.query(`
    SELECT
      p.name,
      SUM(oi.quantity)::INT AS sold
    FROM order_items oi
    JOIN products p
      ON oi.product_id = p.id
    GROUP BY
      p.id,
      p.name
    ORDER BY sold DESC
    LIMIT 5
  `);

  return result.rows;

};

module.exports = {
  getMonthlySales,
  getOrderStatus,
  getTopProducts
};