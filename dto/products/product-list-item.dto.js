function ProductListItemDto(id, price, title, desc, image, category, stock) {
    return {
        id,
        price,
        desc,
        title,
        image,
        category: category || null,
        stock: stock || null
    }
}

module.exports = ProductListItemDto
