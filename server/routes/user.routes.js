const {
  register,
  authenticate,
  verifyEmail,
  checkUserVerification,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/authenticate", checkUserVerification, authenticate);
router.get("/verify", verifyEmail);
module.exports = router;
