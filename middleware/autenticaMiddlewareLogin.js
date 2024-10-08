const jwt = require('jsonwebtoken');

const autenticaMiddlewareLogin = (req,res,next) => {
    const token = req.header("Authorization").replace("Bearer","");

    if(!token){
        return res.status(401).json({messages: "Acesso negado, não há token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verificando o token
        req.user = decoded;
        next();// passa para a próxima função
    }catch(error){
        res.status(400).json({message: "Token inválido"});
    }    
};

module.exports = autenticaMiddlewareLogin;
