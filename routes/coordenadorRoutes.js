const express = require('express');
const router = express.Router();
const coordenador = require('../controllers/coordenadorController');

router.get('/', coordenador.getCoordenadores);
router.get('/', coordenador.getCoordenadoresById);
router.post('/', coordenador.createCoordenador);
router.put('/:id', coordenador.updateCoordenador);
router.delete('/:id', coordenador.deleteCoordenador);

module.exports = router;