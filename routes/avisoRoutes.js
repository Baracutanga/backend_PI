const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController");

// Criar um novo aviso
router.post("/create", avisoController.createAviso);

// Listar todos os avisos
router.get("/", avisoController.getAllAvisos);

module.exports = router;