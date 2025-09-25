const {DataTypes} = require('sequelize'); //appelle sequalize
const db = require('./index'); // appelle l'index

const Comment = db.define('Comment',{// défini les différentes données ainsi que leurs types pour les commentaires
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: "comment" //mets les données dans la table comment du la base de données
});


module.exports = Comment;