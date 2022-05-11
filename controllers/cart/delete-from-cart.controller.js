const {
    responseService,
    cartService
} = require('../../services')
const {
    cartModelToLIstItemMapper,
} = require('../../mappers/cart')

async function deleteFromCartController(req, res) {
    try {
        const cartId = +req.params.cartId
        const productId = +req.params.productId

        const cartItem = await cartService.deleteFromCart(cartId, productId)

        responseService.sendSuccessResponse(
            res, {
                cartItem: cartModelToLIstItemMapper(cartItem)
            }, 201
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = deleteFromCartController
