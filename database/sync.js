const { sequelize } = require('../database')
const { QueryTypes } = require('sequelize')

const User = require('./models/user.model')
const Stock = require('./models/stock.model')
const Product = require('./models/product.model')
const Category = require('./models/category.model')
const Attribute = require('./models/attribute.model')
const Cart = require('./models/cart.model')
const CartItem = require('./models/cart-item.model')
const Order = require('./models/order.model')
const OrderItem = require('./models/order-item.model')

function syncDB() {
    User.sync()
    Stock.sync()
    Product.sync()
    Category.sync()
    Attribute.sync()
    Cart.sync()
    CartItem.sync()
    Order.sync()
    OrderItem.sync()
}

async function getModelsThatDontExist() {
    const modelsThatDoesNotExist = []

    const modelList = [
        User,
        Stock,
        Product,
        Category,
        Attribute,
        Cart,
        CartItem,
        Order,
        OrderItem
    ]

    for (const model of modelList) {
        const tableData = model.getTableName()

        try {
            await sequelize.query(
                `SELECT 1 + 1 as result FROM ${tableData.schema}${tableData.delimiter}${tableData.tableName}`,
                {
                    type: QueryTypes.SELECT,
                },
            )
        } catch (e) {
            if (e.name === 'SequelizeDatabaseError') {
                modelsThatDoesNotExist.push(model)
            } else {
                throw e
            }
        }
    }

    return modelsThatDoesNotExist
}

module.exports = {
    syncDB,
    getModelsThatDontExist
}
