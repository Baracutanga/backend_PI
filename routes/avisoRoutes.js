const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController"); 

//Rotas dos Avisos

// Criar aviso de Professor
router.post("/aviso", avisoController.createAviso);

// Criar aviso de Coordenador (para todas as turmas)
router.post("/aviso/coordenador", avisoController.createAvisoCoordenador);

// Atualizar aviso
router.put("/aviso/:id", avisoController.updateAviso);

// Obter todos os avisos do autor logado
router.get("/aviso", avisoController.getAllAvisos);

module.exports = router;
