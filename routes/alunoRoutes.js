const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

// Criar um novo aluno
router.post("/create", alunoController.createAluno);

// Listar todos os alunos
router.get("/", alunoController.getAllAlunos);

// Deletar aluno por ID
router.delete("/delete/:alunoId", alunoController.deleteAluno);

module.exports = router;
