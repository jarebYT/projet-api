const User = require('./../model/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();


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
    const user = await User.findOne({ 
        where: { 
            email: req.body.email 
        } });
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect !" });
    }

    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect !" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    const { password, ...userData } = user.toJSON();
    res.status(200).json({ user: userData, token });

  } catch (e) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};
