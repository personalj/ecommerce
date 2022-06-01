const {
    addToCartController
} = require('../controllers')

function initCartRoutes(app) {
    app.post('/cart', addToCartController)
}

module.exports = initCartRoutes
