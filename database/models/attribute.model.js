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
            field: 'product_id'
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
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
