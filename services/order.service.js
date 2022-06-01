const {
    Stock,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Product,
    User
} = require('../database/models')

const addItemToOrder = async (id, productId, quantity) => {
    await OrderItem.create({
        orderId: id,
        productId: productId,
        quantity: quantity,
    })
}

async function createOrder(id) {
    try {

        const cart = await Cart.findOne({
            where: {
                id
            },
            include: [{
                model: CartItem
            }]
        })

        if (!cart) {
            throw new Error("Cart doesn't exist");
        }

        if (cart.isClosed) {
            throw new Error("Cart is already closed");
        }

        const stockList = await Stock.findAll({
            where: {
                id: orderProductIds(cart.CartItems)
            }
        })


        for (const product of stockList) {
            const order = cart.CartItems.find(order => order.productId === product.productId)
            if (order.quantity > product.quantity) {
                throw new Error('Not enough quantity in store');
            }
            await product.update({
                quantity: product.quantity - order.quantity
            })
        }

        const order = await Order.create({
            userId: cart.userId,
            total: cart.total,
            cartId: cart.id
        })

        for(const item of cart.CartItems) {
            await addItemToOrder(order.id, item.productId, item.quantity)
        }

        await cart.update({
            isClosed: true
        })


    } catch(e) {
        throw new Error(e)
    }
}

async function getOrderInfo(cartId) {
    try {

        if(!cartId) {
            throw new Error("CartId is invalid");
        }

        const cartInfo = await Cart.findOne({
            where: {
                id: cartId
            },
            include: [
                {
                    model: CartItem,
                    include: {
                        model: Product
                    }
                },
            ]
        })

        if(!cartInfo) {
            throw new Error("Cart doesn't exist");
        }

        return cartInfo

    }  catch(e) {
        throw new Error(e)
    }
}

async function getOrderHistory(userId) {
    try {

        if(!userId) {
            throw new Error("UserId is invalid");
        }

        const orderInfo = await Order.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: User
                },
                {
                    model: OrderItem,
                    include: {
                        model: Product
                    }
                },
            ]
        })

        if(!orderInfo) {
            throw new Error("Order doesn't exist");
        }

        return orderInfo

    } catch(e) {
        throw new Error(e)
    }
}

function orderProductIds(ids) {
    const productIds = []

    for (const order of ids) {
        productIds.push(order.productId)
    }

    return productIds
}

module.exports = {
    createOrder,
    getOrderInfo,
    getOrderHistory
}
