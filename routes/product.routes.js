const {
    getProductListController,
    getProductController,
    createProductController
} = require('../controllers')

function initProductRoutes(app) {
    app.get('/products', getProductListController)

    app.get('/product/:id', getProductController)

    app.post('/products', createProductController)
}

module.exports = initProductRoutes
