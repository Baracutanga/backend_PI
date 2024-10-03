const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");

// criar disciplina
router.post("/create", disciplinaController.criarDisciplina);

// listar disciplinas
router.get("/", disciplinaController.getAllDisciplinas);

module.exports = router;
