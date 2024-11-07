const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");


//Criar nova disciplina

router.post("/create", autenticaMiddlewareCoordenador, disciplinaController.createDisciplina);

//Receber do req.body as disciplinas criadas

router.get("/", autenticaMiddlewareCoordenador, disciplinaController.getAllDisciplinas);

//Deletar uma disciplina

router.delete("/delete", autenticaMiddlewareCoordenador, disciplinaController.deleteDisciplina);

//Deletar todas as disciplinas de uma vez

router.delete("/delete/all", autenticaMiddlewareCoordenador, disciplinaController.deleteAllDisciplinas);

//getAll por turma e disciplina 
router.get("/conceito/turmadisciplina", autenticaMiddlewareProfessor, iconceitoController.getConceitosPorTurmaEDisciplina)

module.exports = router;
