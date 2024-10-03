const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

//rotas professor
router.get('/getAll', professorController.getAllProfessores);
router.post('/create', professorController.createProfessor);

module.exports = router;
