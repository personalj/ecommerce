const {
    addToCartController,
    deleteFromCartController
} = require('../controllers')

function initCartRoutes(app) {
    app.post('/carts', addToCartController)

    app.delete('/carts/:cartId/products/:productId', deleteFromCartController)
}

module.exports = initCartRoutes
