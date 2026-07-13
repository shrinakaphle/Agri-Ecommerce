const express = require("express");

const router = express.Router();

const {
  getDashboardAnalytics
} = require("../controller/AnalyticsController");

router.get("/", getDashboardAnalytics);

module.exports = router;