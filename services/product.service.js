const {
    Product,
    Category,
    Stock
} = require('../database/models')

async function getProductsList(page = 1) {
    const limit = 10

    try {
        const { rows, count } = await Product.findAndCountAll({
            include: [
                {
                    model: Category,
                },
                {
                    model: Stock,
                },
            ],
            limit,
            offset: (page - 1) * limit,
            order:  [["id", "asc"]]
        })


        const pages = await countPages(count, limit ) || null

        return { productList: rows, pages }

    } catch(e) {
        throw new Error(e)
    }
}

function countPages(count, limit ) {
    return Math.ceil(count / limit)
}

module.exports = {
    getProductsList
}
