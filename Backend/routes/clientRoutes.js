const express = require("express");
const router = express.Router();
const clientController = require("../controllers/ClientController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de clientes
router.get("/all", authMiddleware, clientController.list);       
router.get("/:id", authMiddleware, clientController.getById);    
router.post("/create", authMiddleware, clientController.create); 
router.put("/:id", authMiddleware, clientController.update);     
router.delete("/:id", authMiddleware, clientController.delete);   

module.exports = router;
