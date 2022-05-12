const {
    responseService,
    productService
} = require('../../services')
const {
    productModelDtoMapper,
} = require('../../mappers/products')

async function createProductController(req, res) {
    try {
        const productInfo = req.body

        const product = await productService.createProduct(productInfo)

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

module.exports = createProductController
