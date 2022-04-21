const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING(350),
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'category_id'
        },
        stockId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'stock_id'
        }
    },
    {
        tableName: 'products',
    },
)

module.exports = Product
