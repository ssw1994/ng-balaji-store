const {
  fetchProducts,
  addtoCart,
  removeFromCart,
} = require("../controllers/products.controller");

const router = require("express").Router();

router.post("/", fetchProducts);
router.post("/addtocart", addtoCart);
router.post("/removefromcart", removeFromCart);

module.exports = router;
