const { register, authenticate } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/authenticate", authenticate);

module.exports = router;
