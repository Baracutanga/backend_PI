const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController");

// Criar um novo aviso
router.post("/create", avisoController.createAviso);

// Listar todos os avisos
router.get("/", avisoController.getAllAvisos);

//Atualizar status aviso
router.update("/update", avisoController.updateAvisos);

//Deleta o aviso
router.delete("/delete", avisoController.deleteAviso);

module.exports = router;
