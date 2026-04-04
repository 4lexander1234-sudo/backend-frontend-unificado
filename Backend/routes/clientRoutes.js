const express = require("express");
const router = express.Router();
const clientController = require("../controllers/ClientController");

// CRUD de clientes
router.get("/all", clientController.list);       
router.get("/:id", clientController.getById);    
router.post("/create", clientController.create); 
router.put("/update/:id", clientController.update);     
router.delete("/delete/:id", clientController.delete);   

module.exports = router;
