const {CartInfoDto} = require("../../dto");
const cartModelToListItemDtoMapper = require("./cart-model-to-list-item-dto");

function cartModelDtoMapper(cart) {

    return new CartInfoDto(
        cart.id,
        cart.total,
        cart.isClosed,
        cart.CartItems ? cart.CartItems.map(item => cartModelToListItemDtoMapper(item)) : null,
    )
}

module.exports = cartModelDtoMapper
