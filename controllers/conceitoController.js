const Conceito = require('../models/conceitoModel');
const Turma = require('../models/turmaModel');
const Disciplina = require('../models/disciplinaModel');
const mongoose = require('mongoose');

exports.updateNotaUnidade = async (req, res) => {
  try {
    const { alunoId, disciplinaId, unidade, notas } = req.body;

    if (!alunoId || !disciplinaId || !unidade || !notas) {
      return res.status(400).json({ message: "ID do aluno, disciplina, unidade ou notas não fornecidos" });
    }

    const conceito = await Conceito.findOne({ aluno: alunoId, disciplina: disciplinaId });

    if (!conceito) {
      return res.status(404).json({ message: "Conceito não encontrado" });
    }

    if (['unidade1', 'unidade2', 'unidade3'].includes(unidade)) {
      conceito[unidade] = { ...conceito[unidade], ...notas };
    } else {
      return res.status(400).json({ message: "Unidade inválida. Use 'unidade1', 'unidade2' ou 'unidade3'." });
    }

    await conceito.save();

    res.status(200).json({ message: 'Notas atualizadas com sucesso!', conceito });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar conceito", error: error.message });
  }
};

exports.updateAnual = async (req, res) => {
  try {
    const { alunoId, disciplinaId, tipoNota, valor } = req.body;

    if (!alunoId || !disciplinaId || !tipoNota || valor === undefined) {
      return res.status(400).json({ message: "ID do aluno, disciplina, tipo de nota ou valor não fornecidos" });
    }

    const conceito = await Conceito.findOne({ aluno: alunoId, disciplina: disciplinaId });

    if (!conceito) {
      return res.status(404).json({ message: "Conceito não encontrado" });
    }

    if (['MFA', 'FT', 'MFAPN', 'resumo'].includes(tipoNota)) {
      conceito[tipoNota] = valor;
    } else {
      return res.status(400).json({ message: "Tipo de nota inválido. Use 'MFA', 'FT', 'MFAPN' ou 'resumo'." });
    }

    await conceito.save();

    res.status(200).json({ message: 'Nota atualizada com sucesso!', conceito });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar conceito", error: error.message });
  }
};

exports.getConceitosPorTurmaEDisciplina = async (req, res) => {
  try {
    const { turma, disciplina } = req.body;

    if (!turma || !disciplina) {
      return res.status(400).json({ message: "ID ou nome da turma e disciplina não fornecidos" });
    }

    let turmaEncontrada = await Turma.findById(turma).populate('alunos');

    if (!turmaEncontrada) {
      turmaEncontrada = await Turma.findOne({ nome: turma }).populate('alunos');
    }

    if (!turmaEncontrada) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    const alunosIds = turmaEncontrada.alunos.map(aluno => aluno._id);

    let disciplinaEncontrada = await Disciplina.findById(disciplina);

    if (!disciplinaEncontrada) {
      disciplinaEncontrada = await Disciplina.findOne({ nome: disciplina });
    }

    if (!disciplinaEncontrada) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

    const conceitos = await Conceito.find({
      aluno: { $in: alunosIds },
      disciplina: disciplinaEncontrada._id
    });

    if (!conceitos.length) {
      return res.status(404).json({ message: "Nenhum conceito encontrado para a turma e disciplina especificadas" });
    }

    res.status(200).json(conceitos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar conceitos", error: error.message });
  }
};
