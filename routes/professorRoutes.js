const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');


router.get('/', professorController.getAllProfessores);

router.post('/create', professorController.createProfessor);

router.delete("/delete", professorController.deleteProfessor);

module.exports = router;
