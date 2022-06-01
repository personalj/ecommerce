const {CategoryListItemDto} = require("../../dto");

function categoryModelToListItemDtoMapper(category) {
    return new CategoryListItemDto(
        category.id,
        category.name,
        category.desc,
    )
}

module.exports = categoryModelToListItemDtoMapper
