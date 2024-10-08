const Aviso = require('../models/avisoModel');
const Turma = require('../models/turmaModel');
const Disciplina = require('../models/disciplinaModel');
const User =require('../models/userModel');

exports.createAviso = async (req, res) => {
    try {
      const { nome, descricao, turma, disciplina} = req.body;
      const autor = req.user.id;// O id do autor agora vem do token JWT

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
    })
    
    await novoAviso.save();

    res.status(201).json({ message: "Aviso criado com sucesso!", aviso: novoAviso });
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    res.status(500).json({ message: "Erro ao criar aviso", error });
  }
};

