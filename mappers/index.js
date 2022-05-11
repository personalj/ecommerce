const productMappers = require('./products')
const cartMappers = require('./cart')

module.exports = {
    ...productMappers,
    ...cartMappers
}
