const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController"); 
const autenticaMiddlewareProfessor = require("../middleware/autenticaMiddlewareProfessor");

//Rotas dos Avisos

// Criar aviso de Professor
router.post("/aviso", autenticaMiddlewareProfessor, avisoController.createAviso);

// Criar aviso de Coordenador (para todas as turmas)
router.post("/aviso/coordenador", autenticaMiddlewareProfessor, avisoController.createAvisoCoordenador);

// Atualizar aviso
router.put("/aviso/:id", autenticaMiddlewareProfessor, avisoController.updateAviso);

// Obter todos os avisos do autor logado
router.get("/aviso", avisoController.getAllAvisos);

module.exports = router;
