const User = require('./../model/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

exports.getById = async (req,res) => {
    try{
        let user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(user);
    }catch(e){
        res.status(400).json({error: "Impossible de récupérer les utilsateurs"})
    }
}

