const {  getProductListController } = require('../controllers/products')

function initProductRoutes(app) {
    app.get('/products', getProductListController)
}

module.exports = initProductRoutes
