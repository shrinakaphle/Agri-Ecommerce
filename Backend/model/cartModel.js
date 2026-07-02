const pool = require("../database/db");

const addToCart = async (
  user_id,
  product_id,
  quantity,
  weight
) => {

  // check already exists

  const existing =
    await pool.query(
      `
      SELECT *
      FROM cart
      WHERE user_id = $1
      AND product_id = $2
      AND weight = $3
      `,
      [
        user_id,
        product_id,
        weight
      ]
    );

  if (
    existing.rows.length > 0
  ) {

    const updated =
      await pool.query(
        `
        UPDATE cart
        SET quantity =
        quantity + $1
        WHERE id = $2
        RETURNING *
        `,
        [
          quantity,
          existing.rows[0].id
        ]
      );

    return updated.rows[0];
  }

  const result =
    await pool.query(
      `
      INSERT INTO cart
      (
        user_id,
        product_id,
        quantity,
        weight
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        user_id,
        product_id,
        quantity,
        weight
      ]
    );

  return result.rows[0];
};

const getUserCart = async (
  user_id
) => {

  const result =
    await pool.query(
      `
      SELECT

      cart.id,
      cart.quantity,
      cart.weight,
      cart.created_at,

      products.id
      AS product_id,

      products.name,
      products.price,
      products.image

      FROM cart

      JOIN products
      ON cart.product_id =
      products.id

      WHERE cart.user_id = $1

      ORDER BY
      cart.created_at DESC
      `,
      [user_id]
    );

  return result.rows;
};

const updateQuantity =
async (
  id,
  quantity
) => {

  const result =
    await pool.query(
      `
      UPDATE cart
      SET quantity = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        quantity,
        id
      ]
    );

  return result.rows[0];
};

const deleteCartItem =
async (id) => {

  const result =
    await pool.query(
      `
      DELETE FROM cart
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

  return result.rows[0];
};
// =========================
// CLEAR USER CART
// =========================

const clearCartDB = async (user_id) => {

  const result = await pool.query(
    `
    DELETE FROM cart
    WHERE user_id = $1
    `,
    [user_id]
  );

  return result;

};
module.exports = {
  addToCart,
  getUserCart,
  updateQuantity,
  deleteCartItem,
  clearCartDB
};