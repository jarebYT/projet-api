    const User = require('./../model/user.model');
    const jwt = require('jsonwebtoken');
    const bcryptjs = require('bcryptjs');
    require('dotenv').config();

    // Récupère un utilisateur par identifiant.
    exports.getById = async (req,res) => {
        try{
            let user = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({id: user.id, username: user.username, email: user.email});
        }catch(e){
            res.status(404).json({error: "Impossible de récupérer les utilsateurs"})
        }
    }

