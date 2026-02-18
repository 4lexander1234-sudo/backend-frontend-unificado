const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de Usuarios
router.get("/all", authMiddleware, userController.list);       
router.get("/:id", authMiddleware, userController.getById);    

module.exports = router;