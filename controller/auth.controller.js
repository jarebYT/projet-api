// Import du modèle Sequelize représentant la table des utilisateurs.
const User = require('./../model/user.model');

// Bibliothèque pour signer et vérifier des JSON Web Tokens (JWT).
const jwt = require('jsonwebtoken');

// Bibliothèque de hachage pour mots de passe (bcrypt avec salage).
const bcryptjs = require('bcryptjs');

// Chargement des variables d'environnement (ex: JWT_KEY) depuis .env.
require('dotenv').config();

exports.signin = async (req, res, next) => {
    try {
        // Hachage synchrone du mot de passe avec 10 rounds (valeur standard).
        const hash = bcryptjs.hashSync(req.body.password, 10);

        // Création de l'utilisateur.
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        // Suppression du mot de passe hashé avant envoi au client.
        if (user && typeof user.toJSON === 'function') {
            user = user.toJSON();
            delete user.password;
        }

        // 201 = Created
        res.status(201).json(user);
    } catch (e) {
        // En cas de violation d'unicité (email/username déjà pris), Sequelize lèvera une erreur.
        res.status(400).json({ error: "Ce compte existe déjà!" });
    }
};

// Authentifie un utilisateur et lui renvoie un JWT.
exports.login = async (req, res, next) => {
    try {
        // Recherche de l'utilisateur.
        let user = await User.findOne({
            where: {
                username: req.body.username,
                email: req.body.email,
            }
        });

        // Si inconnu: message générique.
        if (!user) {
            // 404 utilisé ici, mais 401 (Unauthorized) est plus canonique pour un échec d'authent.
            return res.status(404).json({ error: "Email ou mot de passe incorrect!" });
        }

        // Vérification du mot de passe fourni vs hash stocké.
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
            // Message volontairement identique pour ne pas révéler si l’email/username existe.
            return res.status(404).json({ error: "Email ou mot de passe incorrect!" });
        }

        // Génération du JWT.
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_KEY
        );

        // Sanitize de l’objet utilisateur retourné: on retire le hash.
        let publicUser = user && typeof user.toJSON === 'function' ? user.toJSON() : user;
        if (publicUser) {
            delete publicUser.password;
        }

        // 200 est standard pour un login; 201 (Created) 
        res.status(201).json({ user: publicUser, token });
    } catch (e) {
        // Réponse générique en cas d'erreur inattendue.
        res.status(400).json({ error: "Impossible de traiter la demande pour le moment." });
    }
};
