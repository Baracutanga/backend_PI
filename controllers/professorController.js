const User = require("../models/userModel");

exports.createProfessor = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const novoProfessor = new User({
      user: "Professor",
      nome,
      email,
      senha,
    });

    await novoProfessor.save();

    res.status(201).json({
      status: "Success",
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    res.status(500).json({ message: "Erro ao criar professor", error });
  }
};

exports.getAllProfessores = async (req, res) => {
  try {
    const professores = await User.find({ user: "Professor" });
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  const { id } = req.body;

  try {
    const professorDeletado = await User.findByIdAndDelete(id);

    return res.status(200).json({
      status: "Success",
      message: "Professor deletado com sucesso",
      data: professorDeletado,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message || "Erro desconhecido",
    });
  }
};
