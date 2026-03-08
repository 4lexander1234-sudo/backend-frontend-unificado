const express = require("express");
const router = express.Router();
const employeController = require("../controllers/EmployeController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de empleados
router.get("/all", authMiddleware, employeController.list);       
router.get("/:id", authMiddleware, employeController.getById);    
router.post("/create", authMiddleware, employeController.create); 
router.put("/update/:id", authMiddleware, employeController.update);     
router.delete("/delete/:id", authMiddleware, employeController.delete);   

module.exports = router;