// Exportando o jsonwebtoken, as configurações de documentação e o 'User'.
//Cont: tudo isso para fazer a config de autenticação e webtoken do usuário ao cadastrar.
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
//Exportando o modelo de usuário que contem as informações de cadastro:email,nome,senha.
//Criando constante autenticaHeader que vai guardar uma requisição do header('Authorization)
//Condição if (!autenticaHeader) para verificar se o usuário tem autorização de entrar no sistema, se não ele retorna mensagem (401) de erro
module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Sem token, autorização negada' });
  }
   //Usuário passou pela autorização
  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Sem token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.secret, decodedToken);
    req.user = await User.findById(decoded.id);
    if (!req.user == 'Professor') {
      return res.status(401).json({ message: 'Usuário não encontrado, autorização negada' });
    }else {
      if(req.user.user !== 'Professor') {
        return res.status(401).json({ message: 'Acesso negado, autorização nao aprovada' });
      }
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token não valido' });
  }
};
