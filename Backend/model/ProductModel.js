const pool = require("../database/db");

// CREATE
const createProduct = async (
  name,
  description,
  price,
  image,
  ingredients,
  feedingGuide,
  categoryId,
  stock,
) => {
  const result = await pool.query(
    `
    INSERT INTO products
    (
      name,
      description,
      price,
      image,
      ingredients,
      feeding_guide,
      category_id,
      stock

    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `,
    [
      name,
      description,
      price,
      image,
      ingredients,
      feedingGuide,
      categoryId,
      stock
    ]
  );

  return result.rows[0];
};

// GET ALL
const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT *
    FROM products
    ORDER BY id DESC
  `);

  return result.rows;
};

// GET BY CATEGORY
const getProductsByCategory = async (categoryId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE category_id = $1
    `,
    [categoryId]
  );

  return result.rows;
};

// GET BY ID
const getProductById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// UPDATE
const updateProduct = async (
  id,
  name,
  description,
  price,
  image,
  ingredients,
  feedingGuide,
  categoryId,
  stock
) => {
  const result = await pool.query(
    `
    UPDATE products
    SET
      name = $1,
      description = $2,
      price = $3,
      image = $4,
      ingredients = $5,
      feeding_guide = $6,
      category_id = $7,
      stock =$8
    WHERE id = $9
    RETURNING *
    `,
    [
      name,
      description,
      price,
      image,
      ingredients,
      feedingGuide,
      categoryId,
      stock,
      id
    ]
  );

  return result.rows[0];
};
const deleteProduct = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};