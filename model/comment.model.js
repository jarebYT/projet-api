const {DataTypes} = require('sequelize');
const db = require('./index');

const Comment = db.define('Comment',{
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
    tableName: "comment"
});

module.exports = Comment;