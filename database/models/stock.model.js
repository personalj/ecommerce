const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Stock = sequelize.define(
    'Stock',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'product_id',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'stocks',
    },
)

module.exports = Stock
