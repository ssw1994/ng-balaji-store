const {
  getCartQuantity,
  getCartItems,
  getUserCartSummary,
  removeCartItem,
  updateCartQuantity,
} = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/quantity", getCartQuantity);
router.get("/items", getCartItems);
router.post("/remove", removeCartItem);
router.get("/summary", getUserCartSummary);
router.post("/update/quantity", updateCartQuantity);
module.exports = router;
