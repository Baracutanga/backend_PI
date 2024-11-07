const express = require("express");
const router = express.Router();
const conceitoController = require("../controllers/conceitoController");

//getAll por turma e disciplina 
router.get("/conceito/turmadisciplina", conceitoController.getConceitosPorTurmaEDisciplina)

// Adicionar/atualizar a nota de uma unidade
router.put("/conceito/unidade", autenticaMiddlewareProfessor, conceitoController.updateNotaUnidade);

// Adicionar/atualizar a nota anual
router.put("/conceito/anual", autenticaMiddlewareProfessor, conceitoController.updateAnual);

module.exports = router;
