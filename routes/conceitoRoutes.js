const express = require("express");
const router = express.Router();
const conceitoController = require("../controllers/conceitoController");

//getAll por turma e disciplina 
router.get("/conceito/turmadisciplina", conceitoController.getConceitosPorTurmaEDisciplina)

// Adicionar/atualizar a nota de uma unidade
router.put("/conceito/unidade", conceitoController.updateNotaUnidade);


router.put("/conceito/anual", conceitoController.updateAnual);

module.exports = router;
