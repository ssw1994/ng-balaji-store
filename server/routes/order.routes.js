const {
  fetchOrderCount,
  fetchMyOrders,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.get("/", fetchMyOrders);
router.get("/count", fetchOrderCount);
module.exports = router;
