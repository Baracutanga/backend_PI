const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
//Importando Middleware para verificacao de token de usuario 
const autenticaMiddlewareProfessor = require('../middleware/autenticaMiddlewareProfessor');
const autenticaMiddlewareCoordenador = require('../middleware/autenticaMiddlewareCoordenador');

//Rotas professor

// Resgatar os Professores do req.body
router.get('/', autenticaMiddlewareProfessor, professorController.getAllProfessores);

// Criar um novo Professor
//Protegido para apenas coordenador adicionar no sistema novo Professor
router.post('/create', autenticaMiddlewareCoordenador, professorController.createProfessor);

// Deletar Professor por ID
//Protegido para apenas coordenador deletar por id no sistema um Professor
router.delete("/delete", autenticaMiddlewareCoordenador, professorController.deleteProfessor);


module.exports = router;
