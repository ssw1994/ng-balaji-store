const {
  register,
  authenticate,
  verifyEmail,
  checkUserVerification,
  fetchAddress,
  saveAddress,
  deleteAddress,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/authenticate", checkUserVerification, authenticate);
router.get("/verify", verifyEmail);
router.get("/address", fetchAddress);
router.post("/address/save", saveAddress);
router.post("/address/delete", deleteAddress);
module.exports = router;
