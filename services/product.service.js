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
                }
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
        const productInfo = await Product.create(product);

        const attributes = {
           ...product,
            product_id: productInfo.id
        }

        await Attribute.create(attributes)

        return {
            ...productInfo.dataValues,
            ...attributes
        }
    } catch(e) {
        throw new Error(e)
    }
}

async function createProductStock(quantity, id) {
    try {
        const productStock = await Stock.findOne({
            where: {
                product_id: id
            },
        })


        if (productStock) {
            await productStock.update({
                quantity: productStock.quantity > 0 ? productStock.quantity + quantity : 0
            })
            return productStock
        }


       return await Stock.create({
            productId: id,
            quantity
        })


    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    getProductsList,
    getProductById,
    createProduct,
    createProductStock
}
