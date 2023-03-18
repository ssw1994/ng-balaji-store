const {
  register,
  authenticate,
  verifyEmail,
  checkUserVerification,
  fetchAddress,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/authenticate", checkUserVerification, authenticate);
router.get("/verify", verifyEmail);
router.get("/address", fetchAddress);
module.exports = router;
