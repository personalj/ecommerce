const {
    getProductListController,
    getProductController
} = require('../controllers')

function initProductRoutes(app) {
    app.get('/products', getProductListController)

    app.get('/product/:id', getProductController)
}

module.exports = initProductRoutes
