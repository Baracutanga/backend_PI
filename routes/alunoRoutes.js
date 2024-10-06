const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");


router.post("/create", alunoController.createAluno);

router.get("/", alunoController.getAllAlunos);

router.delete("/delete", alunoController.deleteAluno);

module.exports = router;
