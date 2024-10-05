const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
//Importando Middleware para verificacao de token de usuario 
const autenticaMiddlewareProfessor = require('../middleware/autenticaMiddlewareProfessor')

//rotas professor
router.get('/getAll', autenticaMiddlewareProfessor, professorController.getAllProfessores);
router.post('/create', autenticaMiddlewareProfessor, professorController.createProfessor);

module.exports = router;
