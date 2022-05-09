const {
    getProductListController,
    getProductController,
    createProductController,
    createProductStockController
} = require('../controllers')

function initProductRoutes(app) {
    app.get('/products', getProductListController)

    app.get('/product/:id', getProductController)

    app.post('/products', createProductController)

    app.post('/product/stock/:id', createProductStockController)
}

module.exports = initProductRoutes
