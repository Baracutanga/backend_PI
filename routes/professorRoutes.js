const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
//Importando Middleware para verificacao de token de usuario 
const autenticaMiddlewareProfessor = require('../middleware/autenticaMiddlewareProfessor')

//Rotas professor

// Resgatar os Professores do req.body
router.get('/', autenticaMiddlewareProfessor, professorController.getAllProfessores);

// Criar um novo Professor
router.post('/create', autenticaMiddlewareCoordenador, professorController.createProfessor);

// Deletar Professor por ID
router.delete("/delete", autenticaMiddlewareCoordenador, professorController.deleteProfessor);


module.exports = router;
