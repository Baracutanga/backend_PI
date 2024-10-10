const express = require("express");
const router = express.Router();
const coordenadorController = require("../controllers/coordenadorController"); 
const autenticaMiddlewareCoordenador = require("../middleware/autenticaMiddlewareCoordenador")

// Rota para criar um coordenador
router.post("/create", autenticaMiddlewareCoordenador, coordenadorController.createCoordenador);
 
// Rota para deletar um coordenador
router.delete("/delete", autenticaMiddlewareCoordenador, coordenadorController.deleteCoordenador);

router.put("/update", autenticaMiddlewareCoordenador, coordenadorController.updateCoordenador);

module.exports = router;
