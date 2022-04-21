const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.URL}:${process.env.PORT}/${process.env.DB}`,
    {
        schema: 'ecommerce',
    },
)

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

module.exports = {
    sequelize,
}
