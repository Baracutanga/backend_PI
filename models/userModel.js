const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  user: { type: String, enum: ['Professor', 'Aluno', 'Coordenador'], required: true },
  email: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  senha: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  conceito: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Conceito', 
    required: function() { return this.user === 'Aluno'; },
    default: null 
  },
  disciplinas: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Disciplina',
    required: function() { return this.user === 'Professor'; }, 
  }]  
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  if (this.user === 'Coordenador') {
    this.isAdmin = true;
  } else {
    this.isAdmin = false;
  }
  
  if (this.user !== 'Aluno') {  
    this.conceito = null; 
  }

  next();
});

UserSchema.methods.compareSenha = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
