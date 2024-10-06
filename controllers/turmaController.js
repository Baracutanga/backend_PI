const Turma = require("../models/turmaModel");
const Disciplina = require("../models/disciplinaModel");
const User = require("../models/userModel");

exports.createTurma = async (req, res) => {
  try {
    const { nome, disciplinas, turno } = req.body;

    const disciplinasExistentes = await Disciplina.find({
      $or: [
        { _id: { $in: disciplinas } },
        { nome: { $in: disciplinas } }
      ]
    });

    if (disciplinasExistentes.length !== disciplinas.length) {
      return res.status(404).json({ message: 'Uma ou mais disciplinas não foram encontradas.' });
    }

    const novaTurma = new Turma({
      nome,
      disciplinas: disciplinasExistentes.map(disciplina => disciplina._id),
      turno
    });

    await novaTurma.save();

    await Disciplina.updateMany(
      { _id: { $in: disciplinasExistentes.map(d => d._id) } },
      { $addToSet: { turmas: novaTurma._id } }
    );

    const professoresAssociados = await User.find({
      _id: { $in: disciplinasExistentes.map(disciplina => disciplina.professor) }
    });

    await User.updateMany(
      { _id: { $in: professoresAssociados.map(professor => professor._id) } },
      { $addToSet: { turmas: novaTurma._id } }
    );

    res.status(201).json({ message: 'Turma criada com sucesso!', turma: novaTurma });
  } catch (err) {
    console.error('Erro ao criar turma:', err);
    res.status(500).json({ message: 'Erro ao criar turma', err });
  }
};

exports.getAllTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate({
        path: 'disciplinas',
        select: '-turmas',
        populate: { path: 'professor', select: 'nome' }
      })
      .populate({
        path: 'alunos',
        select: 'nome email'
      });

    res.status(200).json(turmas);
  } catch (err) {
    console.error('Erro ao buscar turmas:', err);
    res.status(500).json({ message: 'Erro ao buscar turmas', err });
  }
};

exports.deleteTurma = async (req, res) => {
  try {
    const { turma } = req.params;

    let turmaEncontrada = await Turma.findById(turma).populate('disciplinas');

    if (!turmaEncontrada) {
      turmaEncontrada = await Turma.findOne({ nome: turma }).populate('disciplinas');
    }

    if (!turmaEncontrada) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    await Disciplina.updateMany(
      { _id: { $in: turmaEncontrada.disciplinas } },
      { $pull: { turmas: turmaEncontrada._id } }
    );

    await User.findByIdAndUpdate(
      turmaEncontrada.professor,
      { $pull: { turmas: turmaEncontrada._id } }
    );

    await User.updateMany(
      { _id: { $in: turmaEncontrada.alunos } },
      { $pull: { turmas: turmaEncontrada._id } }
    );

    await Turma.findByIdAndDelete(turmaEncontrada._id);

    res.status(200).json({ message: 'Turma deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar turma:', err);
    res.status(500).json({ message: 'Erro ao deletar turma', err });
  }
};
