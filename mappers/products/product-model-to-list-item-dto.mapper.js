const {ProductListItemDto} = require("../../dto");
const categoryModelToListItemDtoMapper = require("./category-model-to-list-item-dto.mapper");

function productModelToListItemDtoMapper(product) {

    return new ProductListItemDto(
        product.id,
        product.price,
        product.title,
        product.desc,
        product.image,
        product.Category ? categoryModelToListItemDtoMapper(product.Category) : null
    )
}

module.exports = productModelToListItemDtoMapper
