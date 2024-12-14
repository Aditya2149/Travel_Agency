const express = require("express");
const {
  getPackages,
  getPackage,
  addPackage,
  deletePackage,
} = require("../controllers/packageController");

const router = express.Router();

router.get("/", getPackages);
router.get("/:id", getPackage);
router.post("/", addPackage);
router.delete("/:id", deletePackage);

module.exports = router;
