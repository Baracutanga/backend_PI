const mongoose = require('mongoose');

// Schema para notas (AV1, AV2, MU, MUPN)
const unidadeSchema = new mongoose.Schema({
  AV1: { type: Number, default: null },
  AV2: { type: Number, default: null },
  MU: { type: Number, default: null },
  MUPN1: { type: Number, default: null },
  MUPN2: { type: Number, default: null },
}, { _id: false });

const notasAlunoSchema = new mongoose.Schema({
  disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  unidade1: { type: unidadeSchema, default: () => ({}) }, // Unidade 1
  unidade2: { type: unidadeSchema, default: () => ({}) }, // Unidade 2
  unidade3: { type: unidadeSchema, default: () => ({}) }, // Unidade 3
  MFA: { type: Number, default: null }, // Menção final anual
  FT: { type: Number, default: 0 }, // Total de faltas
  MFAPN: { type: Number, default: null }, // Menção final anual pós NOA
  resumo: { type: String, default: null } // Resumo final do aluno
}, { _id: false });

  module.exports = mongoose.model('Conceito', notasAlunoSchema);