function ProductItemDto(id, price, title, desc, image, category, stock, attributes) {
    return {
        id,
        price,
        desc,
        title,
        image,
        category: category || null,
        stock: stock || null,
        attributes: attributes || null
    }
}

module.exports = ProductItemDto
