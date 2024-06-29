const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //UserId
    //ProductId
});

module.exports = Cart;