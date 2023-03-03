const { getAllProductCategories } = require("../controllers/util.controller");
const router = require("express").Router();

router.get("/categories", getAllProductCategories);

module.exports = router;
