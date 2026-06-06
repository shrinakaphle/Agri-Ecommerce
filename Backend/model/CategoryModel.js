const pool =require('../database/db');


const getCategories = async () => {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY id ASC"
  );

  return result.rows;
};

const createCategory = async (name,image) => {
  const result =
    await pool.query(
      `
      INSERT INTO categories
      (name,image)
      VALUES($1,$2)
      RETURNING *
      `,
      [name, image]
    );

  return result.rows[0];
};
const updateCategory =async (id,name,image)=>{
    const result =await pool.query(
        `UPDATE categories SET name = $1 ,image=$2 Where id =$3 RETURNING *`,
        [name,image,id]
    );
    return result.rows[0];
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory
};