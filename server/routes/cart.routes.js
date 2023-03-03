const {
  getCartQuantity,
  getCartItems,
  removeCartItem,
} = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/quantity", getCartQuantity);
router.get("/items", getCartItems);
router.post("/remove", removeCartItem);

module.exports = router;
