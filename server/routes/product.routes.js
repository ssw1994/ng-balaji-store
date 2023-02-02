const {
  fetchProducts,
  addtoCart,
  removeFromCart,
  fetchProductsDetails,
} = require("../controllers/products.controller");

const router = require("express").Router();
router.get("/", fetchProductsDetails);
router.post("/", fetchProducts);
router.post("/addtocart", addtoCart);
router.post("/removefromcart", removeFromCart);

module.exports = router;
