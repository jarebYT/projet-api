const {DataTypes} = require('sequelize');// appelle sequalize
const db = require('./index');// appelle l'index

const User = db.define('User',{ // définit les différentes données de l'utilisateur ainsi que leur typage
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "user" // rajoute les données dans la table "user" de la BDD
});

module.exports = User;