const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');


router.post('/create', professorController.createProfessor);

module.exports = router;