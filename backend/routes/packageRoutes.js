const express = require("express");
const {
  getPackages,
  getPackage
} = require("../controllers/packageController");

const router = express.Router();

router.get("/", getPackages);
router.get("/:id", getPackage);

module.exports = router;
