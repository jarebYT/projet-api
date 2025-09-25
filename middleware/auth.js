const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[10];
    try{
        req.token = jwt.verify(token,process.env.JWT_KEY);
        next();
    }catch(e){
        res.status(401).json({error : "Vous devez être authentifié pour réaliser cette action"});
    }
    
}

module.exports = auth;