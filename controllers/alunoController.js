const User = require('./models/User'); // Caminho para o modelo User
const Conceito = require('./models/Conceito'); // Caminho para o modelo Conceito
const Turma = require('./models/Turma'); // Caminho para o modelo Turma
const mongoose = require('mongoose'); // Para verificar IDs

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Controller para criar um novo aluno
exports.createAluno = async (req, res) => {
  try {
    const { user, email, nome, senha, turma } = req.body;

   
    if (user !== 'Aluno') {
      return res.status(400).json({ message: 'O tipo de usuário deve ser Aluno.' });
    }

    const novoAluno = new User({
      user,
      email,
      nome,
      senha,
    });

    
    await novoAluno.save();

    
    const novasNotas = new Conceito({
      disciplina: null, 
      unidade1: { AV1: null, AV2: null },
      unidade2: { MU: null },
      unidade3: { MUPN1: null, MUPN2: null },
      MFA: null,
      FT: 0,
      MFAPN: null,
      resumo: null,
    });

    await novasNotas.save();
    novoAluno.conceito = novasNotas._id;

    let turmaId;
    if (mongoose.Types.ObjectId.isValid(turma)) {
      turmaId = turma;
    } else {
      const turmaQuery = await Turma.findOne({ nome: turma });
      if (!turmaQuery) {
        return res.status(404).json({ status: "fail", message: "Turma não encontrada." });
      }
      turmaId = turmaQuery._id; 
    }

    const turmaAtualizada = await Turma.findByIdAndUpdate(
      turmaId,
      { $addToSet: { alunos: novoAluno._id } }, // Adiciona o aluno à lista de alunos da turma
      { new: true } // Retorna a turma atualizada
    );

    if (!turmaAtualizada) {
      return res.status(404).json({ status: "fail", message: "Erro ao associar aluno à turma." });
    }

    await novoAluno.save();

    res.status(201).json({ message: 'Aluno criado com sucesso!', aluno: novoAluno });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).json({ message: 'Erro ao criar aluno', error });
  }
};

module.exports = {
  criarAluno,
};


module.exports = {
  criarAluno,
};


exports.getAllAlunos = async (req, res) => {
    try {
      const Alunos = await aluno.find();
      res.json(Alunos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getAlunosById = async (req, res) => {
    try {
      const aluno = await aluno.findById(req.params.id).populate('user');
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

  exports.updateAluno = async (req, res) => {
    try {
      const Aluno = await aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteAluno = async (req, res) => {
    try {
      await aluno.findByIdAndDelete(req.params.id);
      res.json({ message: 'Aluno Deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  