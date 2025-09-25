const { Sequelize } = require("sequelize"); //appelle sequalize
require('dotenv').config();
// on a besoin de dotenv pour récuperer les données du .env

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql" 
})
// sert a déterminer l'accés a la bdd depuis PHPmyadmin 

db.authenticate() // Vérifie l'authentification
.then(() => {
    console.log("✅ Connexion BDD OK");// message si réussite
})
.catch((e) => {
    console.error('Error de connexion bdd : ' + e.message)// message si erreur
})

module.exports = db;