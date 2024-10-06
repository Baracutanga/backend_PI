const User = require('../models/userModel'); 
const Conceito = require('../models/conceitoModel');
const Turma = require('../models/turmaModel'); 
const mongoose = require("mongoose");

exports.createAluno = async (req, res) => {
  try {
    const { nome, email, senha, turma } = req.body;

    let turmaEncontrada = await Turma.findById(turma).populate('disciplinas');

    if (!turmaEncontrada) {
      turmaEncontrada = await Turma.findOne({ nome: turma }).populate('disciplinas');
    }

    if (!turmaEncontrada) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    const novoAluno = new User({
      nome,
      email,
      senha,
      user: "Aluno",
      turma: turmaEncontrada._id,
      conceitos: []
    });

    const conceitosPromises = turmaEncontrada.disciplinas.map(async (disciplina) => {
      const novoConceito = new Conceito({
        aluno: novoAluno._id,
        disciplina: disciplina._id,
        unidade1: { AV1: 0, AV2: 0, MU: 0, MUPN1: 0, MUPN2: 0 },
        unidade2: { AV1: 0, AV2: 0, MU: 0, MUPN1: 0, MUPN2: 0 },
        unidade3: { AV1: 0, AV2: 0, MU: 0, MUPN1: 0, MUPN2: 0 },
        MFA: 0,
        FT: 0,
        MFAPN: 0,
        resumo: ""
      });

      await novoConceito.save();
      return novoConceito._id;
    });

    const conceitosCriados = await Promise.all(conceitosPromises);
    novoAluno.conceitos = conceitosCriados;

    await novoAluno.save();

    turmaEncontrada.alunos.push(novoAluno._id);
    await turmaEncontrada.save();

    res.status(201).json({ message: 'Aluno criado com sucesso!', aluno: novoAluno });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar aluno", error: error.message });
  }
};

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await User.find({ user: "Aluno" }).populate('turma'); 

    res.status(200).json(alunos);

  } catch (error) {
    res.status(500).json({ message: "Erro ao obter alunos", error: error.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    const { aluno } = req.body;

    if (!aluno) {
      return res.status(400).json({ message: "ID do aluno não fornecido" });
    }

    let alunoEncontrado;
    if (mongoose.Types.ObjectId.isValid(aluno)) {
      alunoEncontrado = await User.findById(aluno);
    } else {
      return res.status(400).json({ message: "ID do aluno inválido" });
    }

    if (!alunoEncontrado) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    await Conceito.deleteMany({ aluno: alunoEncontrado._id });
    await User.findByIdAndDelete(alunoEncontrado._id);

    const turmaEncontrada = await Turma.findById(alunoEncontrado.turma);

    if (turmaEncontrada) {
      turmaEncontrada.alunos = turmaEncontrada.alunos.filter(a => !a.equals(alunoEncontrado._id));
      await turmaEncontrada.save();
    }

    res.status(200).json({ message: 'Aluno deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar aluno", error: error.message });
  }
};
