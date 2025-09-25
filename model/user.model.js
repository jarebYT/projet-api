const {DataTypes} = require('sequelize');
const db = require('./index');

const User = db.define('User',{
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