const {
    addToCartController,
    deleteFromCartController,
    createOrderController
} = require('../controllers')

function initCartRoutes(app) {
    app.post('/carts', addToCartController)

    app.delete('/carts/:cartId/products/:productId', deleteFromCartController)

    app.post('/carts/:cartId/buy', createOrderController)
}

module.exports = initCartRoutes
