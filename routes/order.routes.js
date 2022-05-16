const {
    orderInfoController,
    orderHistoryController
} = require('../controllers')

function initOrderRoutes(app) {
    app.get('/orders/:cartId', orderInfoController)

    app.get('/orders/history/:userId', orderHistoryController)
}

module.exports = initOrderRoutes
