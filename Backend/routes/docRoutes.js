const express = require("express");
const router = express.Router();
const docController = require("../controllers/DocController");
const { authMiddleware } = require("../middlewares/auth");

// CRUD de tipos de documentos
router.get("/all", authMiddleware, docController.list); 

module.exports = router;