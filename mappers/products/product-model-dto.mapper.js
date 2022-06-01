const {ProductItemDto} = require("../../dto");
const categoryModelToListItemDtoMapper = require("./category-model-to-list-item-dto.mapper");
const stockModelToListItemDtoMapper = require("./stock-model-to-list-item-dto.mapper");
const attributeModelToListItemDtoMapper = require("./attribute-model-to-list-item-dto.mapper")

function productModelToListItemDtoMapper(product) {

    return new ProductItemDto(
        product.id,
        product.price,
        product.title,
        product.desc,
        product.image,
        product.Category ? categoryModelToListItemDtoMapper(product.Category) : null,
        product.Stock ? stockModelToListItemDtoMapper(product.Stock) : null,
        product.Attribute ? attributeModelToListItemDtoMapper(product.Attribute) : null
    )
}

module.exports = productModelToListItemDtoMapper
