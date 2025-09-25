const { Sequelize } = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
})

db.authenticate()
.then(() => {
    console.log("✅ Connexion BDD OK");
})
.catch((e) => {
    console.error('Error de connexion bdd : ' + e.message)
})

module.exports = db;