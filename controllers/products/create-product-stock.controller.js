const {
    responseService,
    productService
} = require('../../services')
const {
    stockModelToListItemDtoMapper,
} = require('../../mappers/products')

async function createProductStockController(req, res) {
    try {
        const { quantity } = req.body
        const id = +req.params.id

        const productStock = await productService.createProductStock(quantity, id)

        responseService.sendSuccessResponse(
            res, {
                productStock: stockModelToListItemDtoMapper(productStock)
            }, 201
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = createProductStockController
