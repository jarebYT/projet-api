const {DataTypes} = require('sequelize');
const db = require('./index');

const Post = db.define('Post',{
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
    tableName: "post"
});

module.exports = Post;