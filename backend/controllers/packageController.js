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
  
  // Create a new package
  const addPackage = async (req, res) => {
    try {
      const newPackage = await createPackage(req.body);
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(500).json({ message: "Error creating package", error: error.message });
    }
  };
  
  // Delete a package
  const deletePackage = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPackage = await deletePackageById(id);
      if (!deletedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting package", error: error.message });
    }
  };
  
  module.exports = {
    getPackages,
    getPackage,
    addPackage,
    deletePackage,
  };
  