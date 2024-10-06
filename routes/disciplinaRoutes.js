const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");


router.post("/create", disciplinaController.createDisciplina);

router.get("/", disciplinaController.getAllDisciplinas);

router.delete("/delete", disciplinaController.deleteDisciplina);

router.delete("/delete/all", disciplinaController.deleteAllDisciplinas);

module.exports = router;
