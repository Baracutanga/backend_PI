const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); 
const avisoController = require("../controllers/avisoController");
const autenticaMiddlewareProfessor = require("../middleware/autenticaMiddlewareProfessor");
const autenticaMiddlewareCoordenador = require("../middleware/autenticaMiddlewareCoordenador");

//Rotas do Login

// Criar aviso de Professor
router.post("/aviso", autenticaMiddlewareProfessor, avisoController.createAviso);

// Criar aviso de Coordenador (para todas as turmas)
router.post("/aviso/coordenador", autenticaMiddlewareCoordenador,avisoController.createAvisoCoordenador);

// Atualizar aviso
router.put("/aviso/:id", autenticaMiddlewareCoordenador, autenticaMiddlewareProfessor, avisoController.updateAviso);

// Obter todos os avisos do autor logado
router.get("/aviso", autenticaMiddlewareProfessor,avisoController.getAllAvisos);

module.exports = router;
