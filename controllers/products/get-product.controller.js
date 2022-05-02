const {
    responseService,
    productService
} = require('../../services')
const {
    productModelDtoMapper,
} = require('../../mappers/products')

async function getProductController(req, res) {
    try {
        const id = +req.params.id

        const product  = await productService.getProductById(id)

        responseService.sendSuccessResponse(
            res, {
                product: productModelDtoMapper(product)
            }, 201
        )

    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = getProductController
