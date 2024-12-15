const {
    getAllPackages,
    getPackageById,
    createPackage,
    deletePackageById,
  } = require("../models/packageModel");
  
  // Get all packages
  const getPackages = async (req, res) => {
    try {
      const packages = await getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages", error: error.message });
    }
  };
  
  // Get a single package by ID
  const getPackage = async (req, res) => {
    try {
      const { id } = req.params;
      const package = await getPackageById(id);
      if (!package) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(package);
    } catch (error) {
      res.status(500).json({ message: "Error fetching package", error: error.message });
    }
  };
  
  module.exports = {
    getPackages,
    getPackage
  };
  