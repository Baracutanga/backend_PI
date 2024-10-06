const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  user: { type: String, enum: ["Professor", "Aluno", "Coordenador"], required: true },
  email: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  senha: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  conceitos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conceito"
  }],
  turma: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Turma", 
    required: function() { return this.user === "Aluno"; } // Apenas para Alunos
  },
  
  // Para Professores: múltiplas turmas
  turmas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turma",
  }],
  
  // Disciplinas do professor, sem obrigatoriedade
  disciplinas: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Disciplina" 
  }]

});

// Pré-save para lidar com a senha e admin status
UserSchema.pre("save", async function(next) {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  if (this.user === "Coordenador") {
    this.isAdmin = true;
  } else {
    this.isAdmin = false;
  }

  next();
});


UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  
  
  if (userObject.user !== "Aluno") {
    delete userObject.conceito;
    delete userObject.turma;
  }
  
  if (userObject.user !== "Professor") {
    delete userObject.turmas;
    delete userObject.disciplinas;
  }

  return userObject;
};

UserSchema.methods.compareSenha = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model("User", UserSchema);
