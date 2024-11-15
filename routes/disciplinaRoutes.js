const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const conceitoController = require("../controllers/conceitoController");
const autenticaMiddlewareCoordenador = require('../middleware/autenticaMiddlewareCoordenador');
const autenticaMiddlewareProfessor = require('../middleware/autenticaMiddlewareProfessor');

//Rotas Disciplinas

//Criar nova disciplina
//Protegido para apenas coordenador criar nova disciplina

router.post("/create", autenticaMiddlewareCoordenador, disciplinaController.createDisciplina);

//Receber do req.body as disciplinas criadas
//Protegido para apenas coordenador receber novas disciplinas

router.get("/", autenticaMiddlewareCoordenador, disciplinaController.getAllDisciplinas);

//Deletar uma disciplina
//Protegido para apenas coordenador deletar novas disciplinas

router.delete("/delete", autenticaMiddlewareCoordenador, disciplinaController.deleteDisciplina);

//Deletar todas as disciplinas de uma vez
//Protegido para apenas coordenador deletar todas as disciplinas de uma vez

router.delete("/delete/all", autenticaMiddlewareCoordenador, disciplinaController.deleteAllDisciplinas);

//getAll por turma e disciplina
//Protegido para apenas Professor receber todas as disciplinas e turmas 
router.get("/conceito/turmadisciplina", autenticaMiddlewareProfessor, conceitoController.getConceitosPorTurmaEDisciplina)

module.exports = router;
