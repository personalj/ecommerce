function ProductItemDto(id, price, title, desc, image, category, stock, attribute) {
    return {
        id,
        price,
        desc,
        title,
        image,
        category: category || null,
        stock: stock || null,
        attribute: attribute || null
    }
}

module.exports = ProductItemDto
