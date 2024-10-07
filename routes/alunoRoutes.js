const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
//Importando middleware pare verificacao de token de usuario
const autenticaMiddlewareAluno = require('../middleware/autenticaMiddlewareAluno');

//Rotas Alunos

// Criar um novo aluno
router.post("/create", autenticaMiddlewareAluno, alunoController.createAluno);

// Listar todos os alunos
router.get("/", autenticaMiddlewareAluno, alunoController.getAllAlunos);

// Deletar aluno por ID
router.delete("/delete",autenticaMiddlewareAluno, alunoController.deleteAluno);

module.exports = router;
