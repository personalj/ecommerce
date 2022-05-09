function ProductListItemDto(id, price, title, desc, image, category) {
    return {
        id,
        price,
        desc,
        title,
        image,
        category: category || null
    }
}

module.exports = ProductListItemDto
