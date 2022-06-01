const {AttributeListItemDto} = require("../../dto");

function attributeModelToListItemDtoMapper(attribute) {
    return new AttributeListItemDto(
        attribute.id,
        attribute.size,
        attribute.color,
        attribute.manufacturer,
        attribute.season,
        attribute.rating
    )
}

module.exports = attributeModelToListItemDtoMapper
