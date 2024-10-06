const Aviso = require("../models/avisoModel"); 
const Turma = require("../models/turmaModel"); 
const Disciplina = require("../models/disciplinaModel"); 
const User = require("../models/userModel");

exports.createAviso = async (req, res) => {
  try {
    const { nome, descricao, turma, disciplina, autor } = req.body;

    const autorExistente = await User.findById(autor);
    if (!autorExistente || autorExistente.user !== "Professor") {
      return res.status(404).json({ message: "Professor não encontrado." });
    }
    
    let turmaExistente;
    if (turma) {
      turmaExistente = await Turma.findById(turma) || await Turma.findOne({ nome: turma });
    }
    if (!turmaExistente) {
      return res.status(404).json({ message: "Turma não encontrada." });
    }

    let disciplinaExistente;
    if (disciplina) {
      disciplinaExistente = await Disciplina.findById(disciplina) || await Disciplina.findOne({ nome: disciplina });
    }
    if (!disciplinaExistente) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    const novoAviso = new Aviso({
      nome,
      descricao,
      turma: turmaExistente._id, 
      disciplina: disciplinaExistente._id, 
      autor
    });

    await novoAviso.save();

    res.status(201).json({ message: "Aviso criado com sucesso!", aviso: novoAviso });
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    res.status(500).json({ message: "Erro ao criar aviso", error });
  }
};

exports.createAvisoCoordenador = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const autor = req.user.id;

    const autorExistente = await User.findById(autor);
    if (!autorExistente || autorExistente.user !== "Coordenador") {
      return res.status(404).json({ message: "Coordenador não encontrado." });
    }

    const novoAviso = new Aviso({
      nome,
      descricao,
      turma: [],
      autor
    });

    const turmas = await Turma.find();
    novoAviso.turma = turmas.map(turma => turma._id);

    await novoAviso.save();

    res.status(201).json({ message: 'Aviso criado com sucesso!', aviso: novoAviso });
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    res.status(500).json({ message: "Erro ao criar aviso", error });
  }
};

exports.updateAviso = async (req, res) => {
  try {
    const { id, nome, descricao, turma, disciplina, autor } = req.body;

    if (!id || !nome || !descricao || !turma || !disciplina || !autor) {
      return res.status(400).json({ message: "Todos os campos devem ser fornecidos" });
    }

    const avisoAtualizado = await Aviso.findByIdAndUpdate(
      id,
      { nome, descricao, turma, disciplina, autor },
      { new: true, runValidators: true }
    );

    if (!avisoAtualizado) {
      return res.status(404).json({ message: "Aviso não encontrado" });
    }

    res.status(200).json({ message: 'Aviso atualizado com sucesso!', aviso: avisoAtualizado });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar aviso", error: error.message });
  }
};

exports.getAllAvisos = async (req, res) => {
  try {
    const userId = req.user.id;

    const avisos = await Aviso.find({ autor: userId })
      .populate("turma", "nome")
      .populate("disciplina", "nome")
      .populate("autor", "nome email");

    res.status(200).json(avisos);
  } catch (error) {
    console.error("Erro ao obter avisos:", error);
    res.status(500).json({ message: "Erro ao obter avisos", error });
  }
};
