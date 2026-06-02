const pool =
require("../database/db");

const addProduct =
async(req,res)=>{

 try{

  const {
   name,
   description,
   category_id
  }
  = req.body;

  const image =
  req.file.path;

  await pool.query(
   `
   INSERT INTO products
   (name,description,image,category_id)
   VALUES($1,$2,$3,$4)
   `,
   [
    name,
    description,
    image,
    category_id
   ]
  );

  res.json({
   message:"Product Added"
  });

 }catch(error){

  res.status(500).json(error);

 }

};
const getProducts =
async(req,res)=>{

 try{

  const result =
  await pool.query(
   `
   SELECT *
   FROM products
   `
  );

  res.json(result.rows);

 }catch(error){

  res.status(500).json(error);

 }

};
const getSingleProduct =
async(req,res)=>{

 try{

  const result =
  await pool.query(
   `
   SELECT *
   FROM products
   WHERE id=$1
   `,
   [req.params.id]
  );

  res.json(
   result.rows[0]
  );

 }catch(error){

  res.status(500).json(error);

 }

};
const getProductsByCategory =
async(req,res)=>{

 try{

  const result =
  await pool.query(
   `
   SELECT *
   FROM products
   WHERE category_id=$1
   `,
   [req.params.id]
  );

  res.json(
   result.rows
  );

 }catch(error){

  res.status(500).json(error);

 }

};
const updateProduct =
async(req,res)=>{

 try{

  const {
   name,
   description,
   category_id
  }
  = req.body;

  const image =
  req.file.path;

  await pool.query(
   `
   UPDATE products
   SET
   name=$1,
   description=$2,
   image=$3,
   category_id=$4
   WHERE id=$5
   `,
   [
    name,
    description,
    image,
    category_id,
    req.params.id
   ]
  );

  res.json({
   message:"Product Updated"
  });

 }catch(error){

  res.status(500).json(error);

 }

};
const deleteProduct =
async(req,res)=>{

 try{

  await pool.query(
   `
   DELETE FROM products
   WHERE id=$1
   `,
   [req.params.id]
  );

  res.json({
   message:"Product Deleted"
  });

 }catch(error){

  res.status(500).json(error);

 }

};
module.exports = {
 addProduct,
 getProducts,
 getSingleProduct,
 getProductsByCategory,
 updateProduct,
 deleteProduct
};