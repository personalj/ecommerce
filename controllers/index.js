const productControllers = require('./products')
const cartControllers = require('./cart')

module.exports = {
    ...productControllers,
    ...cartControllers
}
