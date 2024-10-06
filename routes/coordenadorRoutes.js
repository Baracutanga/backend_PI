const express = require('express');
const router = express.Router();
const coordenadorController = require('../controllers/coordenadorController'); // Ajuste o caminho conforme necessário

// Rota para criar um coordenador
router.post('/create', coordenadorController.createCoordenador);

// Rota para deletar um coordenador
router.delete('/delete', coordenadorController.deleteCoordenador);

module.exports = router;
