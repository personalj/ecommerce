const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Order = sequelize.define(
    'Order',
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
            allowNull: false
        },
    },
    {
        tableName: 'orders',
    },
)

module.exports = Order
