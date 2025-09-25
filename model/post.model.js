const {DataTypes} = require('sequelize'); // appelle sequalize
const db = require('./index');// appel l'index

const Post = db.define('Post',{ // Détermine les données lorsque l'on creer un post ainsi que leur typage
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
        
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    }
},{
    tableName: "post" // incrémente les posts dans la table "post"
});

module.exports = Post; // exporte les posts