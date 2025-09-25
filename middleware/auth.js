const jwt = require('jsonwebtoken');// appelle JWT
require('dotenv').config();// appelle dotenv

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1]; // sert a enlever le bearer dans la string
    try{
        req.token = jwt.verify(token,process.env.JWT_KEY);// verifie que le JWT soit bien le bon une fois hashé
        next();
    }catch(e){
        res.status(401).json({error : "Vous devez être authentifié pour réaliser cette action"});
    }
    
}

module.exports = auth;// export l'auth