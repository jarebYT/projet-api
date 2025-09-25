const User = require('./../model/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();


exports.getAll = async (req,res) => {
    try{
        let userList = await User.findAll();
        res.status(200).json(userList);
    }catch(e){
        res.status(400).json({error: "Impossible de récupérer les utilsateurs"})
    }
}

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

exports.signin = async (req, res, next) => {
    try {
        const hash = bcryptjs.hashSync(req.body.password,10);
        let user = await User.create({
            username : req.body.username,
            email: req.body.email,
            password: hash
        });
        res.status(201).json(user);
    }catch(e){
        res.status(400).json({error: "Ce compte existe déjà!"})
    }
}

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        });
        if(!user){
            return res.status(404).json({error: "Email ou mot de passe incorrect!"});
        }
        if(!bcryptjs.compareSync(req.body.password, user.password)){
            return res.status(404).json({error: "Email ou mot de passe incorrect!"});
        }
        const token = jwt.sign({
            id: user.id
        },process.env.JWT_KEY);
        res.status(201).json({user, token});
    }catch(e){
        res.status(400).json({error: ""})
    }
}

exports.update = async (req, res, next) => {
    try {
        let user = await User.update({
            password: req.body.password
        },{
            where: {
                id: req.params.id
            }
        });
        res.status(201).json(user);
    }catch(e){
        res.status(400).json({error: "Impossible de modifier ce compte"})
    }
}

exports.delete = async (req,res) => {
    try{
        let user = await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(user);
    }catch(e){
        res.status(400).json({error: "Impossible de supprimer ce compte"})
    }
}

