const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/ProveedorController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de proveedor
router.get("/all", authMiddleware, proveedorController.list);       
router.get("/:id", authMiddleware, proveedorController.getById);    
router.post("/create", authMiddleware, proveedorController.create); 
router.put("/update/:id", authMiddleware, proveedorController.update);     
router.delete("/delete/:id", authMiddleware, proveedorController.delete);   

module.exports = router;