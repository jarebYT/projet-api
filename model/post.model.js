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
        unique: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: "post"
});

module.exports = Post;