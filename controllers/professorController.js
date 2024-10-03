const User = require('../models/userModel');
const Disciplina = require('../models/disciplinaModel');


exports.createProfessor = async (req, res) => {
  try {
    const { nome, email, senha, disciplinas } = req.body;

    
    const disciplinasValidas = await Disciplina.find({ '_id': { $in: disciplinas } });
    if (disciplinasValidas.length !== disciplinas.length) {
      return res.status(400).json({ message: 'Uma ou mais disciplinas não foram encontradas' });
    }

    // Criar o novo professor
    const novoProfessor = new User({
      user: 'Professor',
      email,
      nome,
      senha,
      disciplinas: disciplinasValidas.map(disciplina => disciplina._id)
    });

    // Salvar o professor no banco de dados
    await novoProfessor.save();

    res.status(201).json({ message: 'Professor criado com sucesso!', professor: novoProfessor });
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    res.status(500).json({ message: 'Erro ao criar professor', error });
  }
};


exports.getAllProfessores = async (req, res) => {
  try {
    const Professores = await Professores.find();
    res.json(Professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





















// exports.getProfessores = async (req, res) => {
//     try {
//       const Professores = await professor.find();
//       res.json(Professores);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   exports.getProfessoresById = async (req, res) => {
//     try {
//       const professor = await professor.findById(req.params.id).populate('user');
//       if (!professor) {
//         return res.status(404).json({ message: 'Professor não encontrado' });
//       }
//       res.json(professor);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.createProfessor = async (req, res) => {
//     const { nome, email , senha } = req.body;
//     const newProfessor = new Professor({ nome, email, senha });

//     try {
//         const savedProfessor = await newProfessor.save();
//         res.status(201).json(savedProfessor);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };
  
  
//   exports.updateProfessor = async (req, res) => {
//     try {
//       const Professor = await professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!professor) {
//         return res.status(404).json({ message: 'Professor não encontrado' });
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   exports.deleteProfessor = async (req, res) => {
//     try {
//       await professor.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Professor Deletado' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  