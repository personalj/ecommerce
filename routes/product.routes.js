const {
    getProductListController,
    getProductController,
    createProductController,
    createProductStockController
} = require('../controllers')

function initProductRoutes(app) {
    app.get('/products', getProductListController)

    app.get('/products/:id', getProductController)

    app.post('/products', createProductController)

    app.post('/products/stock/:id', createProductStockController)
}

module.exports = initProductRoutes
