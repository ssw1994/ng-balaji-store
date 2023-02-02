const { getCartQuantity } = require("../controllers/cart.controller");

const router = require("express").Router();

router.get("/quantity", getCartQuantity);

module.exports = router;
