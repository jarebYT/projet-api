const {DataTypes} = require('sequelize');
const db = require('./index');

const User = db.define('User',{
    pseudo: {
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
    tableName: "user"
});

module.exports = User;