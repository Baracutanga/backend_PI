const express = require("express");
const router = express.Router();
const conceitoController = require("../controllers/conceitoController");
const autenticaMiddlewareProfessor = require('../middleware/autenticaMiddlewareProfessor');

//Rotas Conceitos

//getAll por turma e disciplina 
router.get("/conceito/turmadisciplina", conceitoController.getConceitosPorTurmaEDisciplina)

// Adicionar/atualizar a nota de uma unidade
//Protegido para apenas professor adicionar/atualizar nota da unidade

router.put("/conceito/unidade", autenticaMiddlewareProfessor, conceitoController.updateNotaUnidade);

// Adicionar/atualizar a nota anual
//Protegido para apenas professor adicionar/atualizar nota anual

router.put("/conceito/anual", autenticaMiddlewareProfessor, conceitoController.updateAnual);

module.exports = router;
