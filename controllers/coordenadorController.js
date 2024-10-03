const coordenador = require('../models/coordenador');

exports.getCoordenadores = async (req, res) => {
    try {
      const Professores = await coordenador.find();
      res.json(Professores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getCoordenadoresById = async (req, res) => {
    try {
      const coordenador = await coordenador.findById(req.params.id).populate('user');
      if (!coordenador) {
        return res.status(404).json({ message: 'Coordenador não encontrado' });
      }
      res.json(coordenador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createCoordenador = async (req, res) => {
    const { nome, email , senha } = req.body;
    const newCoordenador = new Coordenador({ nome, email, senha });

    try {
        const savedCoordenador = await newCoordenador.save();
        res.status(201).json(savedCoordenador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
  
  
  exports.updateCoordenador = async (req, res) => {
    try {
      const Professor = await coordenador.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!coordenador) {
        return res.status(404).json({ message: 'Coordenador não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteCoordenador = async (req, res) => {
    try {
      await coordenador.findByIdAndDelete(req.params.id);
      res.json({ message: 'Coordenador Deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  