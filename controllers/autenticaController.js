const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/jwt');

exports.user = async (req, res) => {
  try {
    const { email , senha } = req.body;
    const aluno = new aluno({ email , senha });
    await userModel.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.user = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const user = await User.findOne({ nome });
    if (!user || !(await user.compareSenha(senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.user({ id: user._id }, config.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};