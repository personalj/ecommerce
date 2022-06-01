function CartInfoDto(id, total, isClosed, cartItem) {
    return {
        id,
        total,
        isClosed,
        cartItems: cartItem || null
    }
}

module.exports = CartInfoDto
