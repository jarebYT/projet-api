const User = require('./user.model');
const Product = require('./product.model');

const relate = async () => {
    await Product.belongsTo(User, {foreignKey: "userId"});
}

module.exports = relate;