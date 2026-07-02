const {
  addToCart,
  getUserCart,
  updateQuantity,
  deleteCartItem,
  clearCartDB
} = require(
  "../model/cartModel"
);

const addCartDB =
async (req,res) => {

  try {

    const {
      user_id,
      product_id,
      quantity,
      weight
    } = req.body;

    if (
      !user_id ||
      !product_id
    ) {
      return res
      .status(400)
      .json({
        message:
        "Missing fields"
      });
    }

    const cart =
      await addToCart(
        user_id,
        product_id,
        quantity || 1,
        weight
      );

    res.status(201).json({
      message:
      "Added To Cart",
      cart
    });

  }
  catch(e){

    res.status(500).json({
      message:
      "Failed To Add Cart",
      error:e.message
    });

  }
};

const getCartDB =
async (req,res) => {

  try {

    const { user_id } =
      req.params;

    const cart =
      await getUserCart(
        user_id
      );

    res.status(200).json({
      message:
      "Cart Fetched",
      cart
    });

  }
  catch(e){

    res.status(500).json({
      message:
      "Failed",
      error:e.message
    });

  }
};

const updateCartDB =
async (req,res) => {

  try {

    const { id } =
      req.params;

    const { quantity } =
      req.body;

    const cart =
      await updateQuantity(
        id,
        quantity
      );

    res.status(200).json({
      message:
      "Quantity Updated",
      cart
    });

  }
  catch(e){

    res.status(500).json({
      message:
      "Update Failed",
      error:e.message
    });

  }
};
//REMOVE ONE CART ITEM 
const deleteCartDB =
async (req,res) => {

  try {

    const { id } =
      req.params;

    const cart =
      await deleteCartItem(id);

    res.status(200).json({
      message:
      "Item Removed",
      cart
    });

  }
  catch(e){

    res.status(500).json({
      message:
      "Delete Failed",
      error:e.message
    });

  }

};

// =========================
// CLEAR USER CART
// =========================
//REMOVE ALL CART ITEM AFTER CHECKOUT
const clearCart = async (req, res) => {

  try {

    const { id } = req.params;

    await clearCartDB(id);

    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Clear Cart"
    });

  }

};
module.exports = {
  addCartDB,
  getCartDB,
  updateCartDB,
  deleteCartDB,
  clearCart
};