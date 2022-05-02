const {
    Product,
    Category,
    Stock
} = require('../../database/models')
const {
    responseService,
    productService
} = require('../../services')
const {
    productModelToListItemDtoMapper,
} = require('../../mappers/products')

async function getProductListController(req, res) {
    try {
        const page = +req.query.page

        const { productList, pages } = await productService.getProductsList(page)

        responseService.sendSuccessResponse(
            res, {
                productList: productList.map((product) => productModelToListItemDtoMapper(product)),
                pages
            }, 201
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e.message,
        )
    }
}

module.exports = getProductListController
