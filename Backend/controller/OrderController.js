const {
  createOrderDB,
  createOrderItemDB,
  getOrdersByUserDB,
  getOrderItemsDB
} = require("../model/OrderModel");

// =========================
// CREATE ORDER
// =========================

const createOrder = async (req, res) => {

  try {

    const {
      user_id,
      total_amount,
      payment_method,
      payment_status,
      shipping_address,
      items
    } = req.body;

    // Create Order
    const order = await createOrderDB(
      user_id,
      total_amount,
      payment_method,
      payment_status,
      shipping_address
    );

    // Save Order Items
    for (const item of items) {

      await createOrderItemDB(
        order.id,
        item.product_id,
        item.quantity,
        item.weight,
        item.price
      );

    }

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Create Order"
    });

  }

};

// =========================
// GET USER ORDERS
// =========================

const getOrdersByUser = async (req, res) => {

  try {

    const { id } = req.params;

    const orders = await getOrdersByUserDB(id);

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Fetch Orders"
    });

  }

};

// =========================
// GET SINGLE ORDER DETAILS
// =========================

const getOrderDetails = async (req, res) => {

  try {

    const { id } = req.params;

    const items = await getOrderItemsDB(id);

    res.status(200).json({
      success: true,
      items
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Fetch Order Details"
    });

  }

};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderDetails
};