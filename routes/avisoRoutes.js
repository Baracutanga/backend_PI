const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController"); 
const autenticaMiddlewareProfessor = require("../middleware/autenticaMiddlewareProfessor");

//Rotas dos Avisos

// Criar aviso de Professor
//Protegido para apenas professor postar o aviso de Professor
router.post("/aviso", autenticaMiddlewareProfessor, avisoController.createAviso);

// Criar aviso de Coordenador (para todas as turmas)
//Protegido para apenas professor postar o aviso de Coordenador para todas as turmas
router.post("/aviso/coordenador", autenticaMiddlewareProfessor, avisoController.createAvisoCoordenador);

// Atualizar aviso
//Protegido para apenas professor atualizar o aviso de Professor
router.put("/aviso/:id", autenticaMiddlewareProfessor, avisoController.updateAviso);

// Obter todos os avisos do autor logado
router.get("/aviso", avisoController.getAllAvisos);

module.exports = router;
