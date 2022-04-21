const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'user_name',
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'users'
    },
)

module.exports = User
