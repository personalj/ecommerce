const {
    Product,
    Category,
    Stock,
    Attribute
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

async function getProductById(id) {
    try {
        return await Product.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Category,
                },
                {
                    model: Stock,
                },
                {
                    model: Attribute,
                }
            ],
        })
    } catch(e) {
        throw new Error(e)
    }
}

async function createProduct(product) {
    try {
        const productInfo = await Product.create(product, {
            include: [
                {
                    model: Attribute
                },
                {
                    model: Category
                }
            ],
        });

        const attributes = {
           ...product,
            product_id: productInfo.id
        }

        await Attribute.create(attributes)

        return productInfo
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    getProductsList,
    getProductById,
    createProduct
}
