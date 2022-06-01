const {
    responseService,
    orderService
} = require('../../services')

async function createOrderController(req, res) {
    try {
        const cartId = +req.params.cartId

        await orderService.createOrder(cartId)

        responseService.sendSuccessResponse(
            res, {
                result: 'Successful purchase'
            }, 201
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = createOrderController
