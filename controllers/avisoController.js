const Aviso = require("../models/avisoModel"); 
const Turma = require("../models/turmaModel"); 
const Disciplina = require("../models/disciplinaModel"); 
const User = require("../models/userModel"); // Modelo de User

///////////////////////////////////////////////////////////


exports.criarAviso = async (req, res) => {
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

//////////////////////////////////////////////////////////////////////

const getAllAvisos = async (req, res) => {
  try {
    
    const avisos = await Aviso.find()
      .populate("turma", "nome") 
      .populate("disciplina", "nome") 
      .populate("autor", "nome email");

    res.status(200).json(avisos);

  } catch (error) {
    console.error("Erro ao obter avisos:", error);
    res.status(500).json({ message: "Erro ao obter avisos", error });
  }
};



// // criar aviso para turma (nome ou id) e disciplina (nome ou id)!
// exports.criarAviso = async (req, res) => {
//   try {
//       const { nome, descricao, turma, disciplina } = req.body; 
      
      
//       if (!nome || !descricao || !turma || !disciplina) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Nome, descrição, turma e disciplina são obrigatórios."
//         });
//       }

//       let turmaId;
//       let disciplinaId;

//       if(mongoose.Types.ObjectId.isValid(turma)) {
//         turmaId = turma

//       } else {        
                        
//         let turmaQuery = Turma.findOne({ nome: turma });
        
//         if(!turmaQuery)res.status(404).json({status: "fail", message: "Turma não encontrada."})
        
//         turmaId = turmaQuery._id;          

//       }
      
//       if(mongoose.Types.ObjectId.isValid(disciplina)) {
//         disciplinaId = disciplina

//       } else {
        
//         let disciplinaQuery = Disciplina.findOne({ nome: disciplina });
        
//         if(!disciplinaQuery)res.status(404).json({status: "fail", message: "Disciplina não encontrada"})
        
//         disciplinaId = disciplinaQuery._id;          

//       } 

//       const novoAviso = new Aviso({
//         nome,
//         descricao,
//         turma: turmaId,
//         disciplina: disciplinaId
//       });

//       const avisoSalvo = await novoAviso.save(); 
      
//       return res.status(201).json({
//         status: "success",
//         message: "Aviso criado com sucesso!",
//         data: avisoSalvo 
//       });
//   } catch(err) { 
//       return res.status(500).json({ 
//         message: "Erro ao criar aviso", 
//         err: err.message 
//       });
//   }
// };

// ///////////////////////////////////////////////////////////

// exports.deleteAviso = async (req, res) => {
//   const { avisoId } = req.params;

//   try {
//     const avisoDeletado = await Aviso.findByIdAndDelete(avisoId);

//     if (!avisoDeletado) {
//       return res.status(404).json({ message: "Aviso não encontrado" });
//     }

//     return res.status(200).json({ message: "Aviso deletado!" }); 

//   } catch (err) {
//     return res.status(500).json({ message: "Erro ao deletar aviso!", err }); // Corrigi o status para 500
//   }
// }
// // utilizar para mostrar aviso do Aluno !
// exports.listarAvisosPorTurma = async (req, res) => {
//   const alunoId = req.params.alunoId;

//   try {
//     const aluno = await Aluno.findById(alunoId).populate("turma");
//     if (!aluno) {
//       return res.status(404).json({ message: "Aluno não encontrado" });
//     }

    
//     const avisos = await Aviso.find({ turma: aluno.turma._id })
//       .populate({
//         path: "disciplina",
//         select: "nome" 
//       });

//     if (!avisos.length) {
//       return res.status(404).json({ message: "Nenhum aviso encontrado para esta turma." });
//     }

//     return res.status(200).json({
//       status: "success",
//       data: {
//         avisos,
//       },
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Erro ao listar avisos", err: err.message });
//   }
// };

   exports.updateAvisos = async (req,res) => {
     const avisosUp = await aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if (!aviso) {
        return res.status(404).json({ message: 'Aviso não enviado' });
      }
      res.json(aviso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


