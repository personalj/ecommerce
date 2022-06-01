const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Cart = sequelize.define(
    'Cart',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isClosed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_closed'
        },
    },
    {
        tableName: 'carts',
    },
)

module.exports = Cart
