const productDtos = require('./products')
const cartDtos = require('./cart')

module.exports = {
    ...productDtos,
    ...cartDtos
}
