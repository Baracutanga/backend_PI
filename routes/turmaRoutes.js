const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');


router.post('/create', turmaController.createTurma);

router.get('/', turmaController.getAllTurmas);

router.delete('/delete/:id?', turmaController.deleteTurma);

module.exports = router;