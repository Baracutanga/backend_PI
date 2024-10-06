const express = require('express');
const router = express.Router();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require("mongoose"); 

const professorRoutes = require('./routes/professorRoutes');
const coordenadorRoutes = require('./routes/coordenadorRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require("./routes/disciplinaRoutes");
const avisoRoutes = require("./routes/avisoRoutes");
const turmaRoutes = require("./routes/turmaRoutes");
const conceitoRoutes = require("./routes/conceitoRoutes"); 

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

DB = "mongodb+srv://rogercauarcb:1500@users.wq3oh.mongodb.net/projetoIntegrador";

mongoose.connect(DB)
.then(() => console.log("Conectado ao Banco de Dados"))
.catch(err => console.log("Erro ao Conectar ao Banco de dados", err));

// Inicializar o aplicativo Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Middleware para habilitar CORS
app.use(cors());

// Middleware para log de requisições
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware para parsing de JSON
app.use(express.json());

//Usar body-parser
app.use(bodyParser.json());

// Rotas
// app.use('/api/auth', authRoutes);

app.use("/api/turma", turmaRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/aluno', alunoRoutes);
app.use('/api/coordenador', coordenadorRoutes);
app.use("/api/disciplina", disciplinaRoutes);
app.use("/api/aviso", avisoRoutes);
app.use("/api/conceito", conceitoRoutes);

// Configuração do Swagger
// http://localhost:3000/api-docs


// Configuração da Porta
const PORT = process.env.PORT || 8000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server está rodando na porta ${PORT}`);
});

