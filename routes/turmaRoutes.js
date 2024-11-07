const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

//Rotas Turma

// Criar as turmas 
router.post('/create', autenticaMiddlewareCoordenador, turmaController.createTurma);

// Resgatar as turmas do req.body

router.get('/', autenticaMiddlewareCoordenador, turmaController.getAllTurmas);

// Deletar turma por ID

router.delete('/delete/:id?', autenticaMiddlewareCoordenador, turmaController.deleteTurma);

module.exports = router;