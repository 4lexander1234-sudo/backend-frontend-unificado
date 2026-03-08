const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de products
router.get("/all", authMiddleware, productController.list);       
router.get("/:id", authMiddleware, productController.getById);    
router.post("/create", authMiddleware, productController.create); 
router.put("/update/:id", authMiddleware, productController.update);     
router.delete("/delete/:id", authMiddleware, productController.delete);   

module.exports = router;