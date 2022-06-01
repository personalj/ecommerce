const {CartListItemDto} = require("../../dto");

function cartModelToListItemDtoMapper(cartItem) {

    return new CartListItemDto(
        cartItem.id,
        cartItem.quantity,
    )
}

module.exports = cartModelToListItemDtoMapper
