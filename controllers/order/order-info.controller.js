const {
    responseService,
    orderService
} = require('../../services')

async function orderInfoController(req, res) {
    try {
        const cartId = +req.params.cartId

        const orderInfo = await orderService.getOrderInfo(cartId)

        res.render('order-info-list', {
            ...orderInfo.dataValues
        })
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = orderInfoController
