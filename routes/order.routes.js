const {
    orderInfoController,
} = require('../controllers')

function initOrderRoutes(app) {
    app.get('/orders/:cartId', orderInfoController)
}

module.exports = initOrderRoutes
