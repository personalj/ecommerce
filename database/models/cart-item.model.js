const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const CartItem = sequelize.define(
    'CartItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'cart_id'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'product_id'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'cart_items',
    },
)

module.exports = CartItem
