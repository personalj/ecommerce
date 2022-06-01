const {
    responseService,
    cartService
} = require('../../services')
const {
    cartModelDtoMapper,
} = require('../../mappers/cart')

async function addToCartController(req, res) {
    try {
        const cartInfo = req.body

        const cart = await cartService.addUpdateCart(cartInfo)

        responseService.sendSuccessResponse(
            res, {
                cart: cartModelDtoMapper(cart)
            }, 201
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = addToCartController
