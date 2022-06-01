const {
    responseService,
    orderService
} = require('../../services')

async function orderHistoryController(req, res) {
    try {
        const userId = +req.params.userId

        const orderUserHistory = await orderService.getOrderHistory(userId)

        res.render('orders-history/list', {
            ...orderUserHistory.dataValues
        })
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = orderHistoryController
