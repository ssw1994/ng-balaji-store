const {
  getCartQuantity,
  getCartItems,
  getUserCartSummary,
  removeCartItem,
  updateCartQuantity,
  placeOrder,
} = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/quantity", getCartQuantity);
router.get("/items", getCartItems);
router.post("/remove", removeCartItem);
router.get("/summary", getUserCartSummary);
router.post("/update/quantity", updateCartQuantity);
router.post("/order", placeOrder);
module.exports = router;
