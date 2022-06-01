const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Attribute = sequelize.define(
    'Attribute',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'product_id'
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        season: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: 'attributes',
    },
)

module.exports = Attribute
