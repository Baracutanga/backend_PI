const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.createCoordenador = async (req, res) => {
  try {
    const { user, email, nome, senha } = req.body;

    if (!user || !email || !nome || !senha) {
      return res.status(400).json({ message: "Todos os campos devem ser fornecidos" });
    }

    const coordenador = new User({
      user: "Coordenador",
      email,
      nome,
      senha
    });

    await coordenador.save();
    res.status(201).json({ message: 'Coordenador criado com sucesso!', coordenador });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar coordenador", error: error.message });
  }
};

exports.deleteCoordenador = async (req, res) => {
  try {
    const { coordenador } = req.body;

    if (!coordenador) {
      return res.status(400).json({ message: "ID ou nome do coordenador não fornecido" });
    }

    let coordenadorDeletado;

    if (mongoose.Types.ObjectId.isValid(coordenador)) {
      coordenadorDeletado = await User.findByIdAndDelete(coordenador);
    }

    if (!coordenadorDeletado) {
      coordenadorDeletado = await User.findOneAndDelete({ nome: coordenador, user: "Coordenador" });
    }

    if (!coordenadorDeletado) {
      return res.status(404).json({ message: "Coordenador não encontrado" });
    }

    res.status(200).json({ message: 'Coordenador deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar coordenador", error: error.message });
  }
};
