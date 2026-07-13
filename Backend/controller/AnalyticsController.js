const {
  getMonthlySales,
  getOrderStatus,
  getTopProducts
} = require("../model/AnalyticsModel");

const getDashboardAnalytics = async (req, res) => {

  try {

    const monthlySales =
      await getMonthlySales();

    const orderStatus =
      await getOrderStatus();

    const topProducts =
      await getTopProducts();

    res.json({

      success: true,

      monthlySales,

      orderStatus,

      topProducts

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  getDashboardAnalytics
};