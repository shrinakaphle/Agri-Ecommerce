// const{
//     createProduct,
//     getAllProducts,
//     getProductsByCategory,
//     getProductById,
//     updateProduct,
//     deleteProduct,
// }= require("../model/ProductModel");
// // createproduct
// const addProduct = async(req,res)=>{
//     try{
//         const{
//             name,
//             description,
//             price,
//             ingredients,
//             feeding_guide,
//             category_id,
//         }= req.body;
    
//     const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}`
//     : null;

//     const product =await createProduct(
//         name,
//         description,
//         price,
//         image,
//         ingredients,
//         feeding_guide,
//         category_id
//     );
//     res.status(201).json({
//         success:true,
//         message:"Product added successfully",
//         product,
//     });
// } catch (error){
//     res.status(500).json({
//         success:false,
//         message:error.message,
//     });
// }
// };

// //get all products
// const fetchProducts = async (req,res)=>{
//     try{
//         const products = await getAllProducts();
//         res.status(200).json({
//             success :true,
//             products,
//         });

//     } catch (e) {
//         res.status(500).json ({
//             success:false,
//             message:error.message,
//         });
//     }
// }

// // get products by category

// const fetchProductsByCategory =async (req,res)=>{
//     try{
//         const products = await getProductsByCategory(
//             req.params.id);
//         res.status(200).json({
//             success:true,
//             products,
//         });
//     }catch(e){
//         res.status(500).json({
//             success:false,message:error.message,
//         });
//     }
// };

// //get single product 
// const fetchProduct =async (req,res)=>{
//     try{
//         const product =await getProductById(req.params.id);
//         if(!product){
//             return res.status(404).json({
//                 success :false,
//                 message:"Product not found"
//             });
//         }
//         res.status(200).json({
//             success:true,
//             product,
//         });
//     } catch(e){
//         res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
// };

// //Update product

// const editProduct = async(req,res)=>{
//     try{
//         const {id} = req.params;
//         const oldPorduct = await gerProductById(id);
//         if(!oldProduct){
//             return res.status(404).json({
//                 success:false,
//                 message:"Product not found",
//             });
//         }
//         const{
//          name,
//       description,
//       price,
//       ingredients,
//       feeding_guide,
//       category_id,
//         }=req.body;

//         const image=req.file?`http://localhost:5000/uploads/${req.file.filename}`
//         :oldProduct.image;

//         const product =
//         await updateProduct(
//             id,
//             name,
//             description,
//             price,
//             image,
//             ingredients,
//             feeding_guide,
//             category_id
//         );

//     res.status(200).json({
//         success:true,
//         message:"Product updated successfully",
//         product,

//     });
//     }catch (e){
//         res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
// };

// //Delete Product
// const removeProduct = async (
//   req,
//   res
// ) => {
//   try {
//     const deletedProduct =
//       await deleteProduct(
//         req.params.id
//       );

//     if (!deletedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message:
//         "Product deleted successfully",
//       product: deletedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   addProduct,
//   fetchProducts,
//   fetchProductsByCategory,
//   fetchProduct,
//   editProduct,
//   removeProduct,
// };
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../model/ProductModel");

// =========================
// CREATE PRODUCT
// =========================
const addProduct = async (req, res) => {
    console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  try {
    const {
      name,
      description,
      price,
      ingredients,
      feeding_guide,
      category_id,
      stock,
    } = req.body;

   const image = req.file
? req.file.filename
: null;

    const product = await createProduct(
      name,
      description,
      price,
      image,
      ingredients,
      feeding_guide,
      category_id,
      stock
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL PRODUCTS
// =========================
const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET PRODUCTS BY CATEGORY
// =========================
const fetchProductsByCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const products = await getProductsByCategory(req.params.id);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE PRODUCT
// =========================
const fetchProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // IMPORTANT: return raw product (frontend friendly)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const oldProduct = await getProductById(id);

    if (!oldProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      ingredients,
      feeding_guide,
      category_id,
      stock,
    } = req.body;
const image = req.file
  ? req.file.filename
  : oldProduct.image;
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      image,
      ingredients,
      feeding_guide,
      category_id,
      stock
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  fetchProducts,
  fetchProductsByCategory,
  fetchProduct,
  editProduct,
  removeProduct,
};