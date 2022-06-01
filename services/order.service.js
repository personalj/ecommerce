const {
    Stock,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Product
} = require('../database/models')
const { orderProductIds } =require('../utils/helpers')


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
                id: [...orderProductIds(cart.CartItems)]
            }
        })

        for (const product of stockList) {
            const order = cart.CartItems.find(order => order.id === product.productId)
            if (order.quantity > product.quantity) {
                throw new Error('Not enough quantity in store');
            }
            await product.update({
                quantity: product.quantity - order.quantity
            })

            const orderInfo = {
                userId: cart.user_id,
                total: cart.total,
                OrderItems: {
                    productId: order.product_id,
                    quantity: order.quantity,
                }
            }

            await Order.create(orderInfo, {
                include: [
                    {
                        model: OrderItem
                    }
                ]
            })
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

module.exports = {
    createOrder,
    getOrderInfo
}
