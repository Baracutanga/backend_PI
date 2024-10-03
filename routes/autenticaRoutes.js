// Configuração de rota jsonwebtoken
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

app.post("/professorRoutes", (req, res) => {
    const { email, senha } = req.body; 
    if (username === "professor" && password === "professor") { 
        const token = jwt.sign({ username },  
        process.env.JWT_SECRET_KEY, { 
            expiresIn: 86400 
        });
        return res.json({ email, token, msg: "Login Realizado com Sucesso" }); 
    } 
    return res.json({ msg: "Credenciais Inválidas" }); 
});
//provavelmente tera que criar verificação de jsonwebtoken de aluno, coordenador, professor, se não linkar apenas a usuário.