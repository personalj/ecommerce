const productControllers = require('./products')
const cartControllers = require('./cart')
const orderControllers = require('./order')

module.exports = {
    ...productControllers,
    ...cartControllers,
    ...orderControllers
}
