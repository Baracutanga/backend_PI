const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');
const autenticaMiddlewareCoordenador = require('../middleware/autenticaMiddlewareCoordenador');

//Rotas Turmas

// Criar as turmas
//Protegido para apenas coordenador criar novas turmas 

router.post('/create', autenticaMiddlewareCoordenador, turmaController.createTurma);

// Resgatar as turmas do req.body
//Protegido para apenas coordenador receber novas turmas 

router.get('/', autenticaMiddlewareCoordenador, turmaController.getAllTurmas);

// Deletar turma por ID
//Protegido para apenas coordenador deletar turma por id

router.delete('/delete/:id?', autenticaMiddlewareCoordenador, turmaController.deleteTurma);

module.exports = router;