const express = require("express");
const router = express.Router();
const clientController = require("../controllers/ClientController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de clientes
router.get("/all", clientController.list);       
router.get("/:id", authMiddleware,clientController.getById);   
router.get("findByEmail/:email", clientController.findByEmail); 
router.post("/create", clientController.create); 
router.put("/update/:id", clientController.update);     
router.delete("/delete/:id", clientController.delete);   

module.exports = router;
