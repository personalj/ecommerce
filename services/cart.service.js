const {
    User,
    Cart,
    CartItem,
    Stock
} = require('../database/models')
const { Op } = require("sequelize")
const { getProductById } = require( './product.service')
const { orderProductIds } =require('../utils/helpers')

const addItemToCart = async (cartId, productId, quantity) => {
    await CartItem.create({
        cartId: cartId,
        productId: productId,
        quantity: quantity
    })
}

const getUserCart = async (user) => {
    return await Cart.findOne({
        where: {
            userId: user.id,
            isClosed: {
                [Op.is]: false
            }
        },
        include: [{
            model: CartItem
        }],
    })
}

async function addUpdateCart(cartInfo) {
    try {
        let calcTotal = 0

        const stockList = await Stock.findAll({
            where: {
                id: [...orderProductIds(cartInfo.items)]
            }
        })

        for (const item of cartInfo.items) {
            const product = await getProductById(item.id)
            if(!product) {
                throw new Error("The product doesn't exist");
            }
            calcTotal += product.price * item.quantity
        }

        for (const product of stockList) {
            const order = cartInfo.items.find(order => order.id === product.productId)
            if (order.quantity > product.quantity) {
                throw new Error('Not enough quantity in store');
            }
        }

        const user = await User.findOne({
            where: {
                email: cartInfo.email
            }
        })

        const userCart = user && await getUserCart(user)

        if (!userCart || userCart.isClosed) {
            const cart = await Cart.create({
                ...cartInfo,
                userId: user.id,
                total: calcTotal,
                isClosed: false
            })

           for(const item of cartInfo.items) {
               await addItemToCart(cart.id, item.id, item.quantity)
           }

           return userCart
        }


        for(const item of cartInfo.items) {
            const cartItemExists = userCart.CartItems.find(
                cartItem => cartItem.productId === item.id,
            );

            if (cartItemExists) {
                await cartItemExists.update({
                    quantity: item.quantity,
                });
            } else {
                await addItemToCart(userCart.id, item.id, item.quantity)
            }

            await userCart.update({
                total: calcTotal
            })
        }

        return getUserCart(user)

    } catch(e) {
        throw new Error(e)
    }
}

async function deleteFromCart(cartId, productId) {
    const product = await getProductById(productId)

    const cartItem = await CartItem.findOne({
        where: {
            cartId,
            productId,
        },
    })

    if (!cartItem || !product) {
        throw new Error('Product not found');
    }

    const userCart = await Cart.findOne({
        where: {
           id: cartId
        },
    })

    const calcTotal = userCart.total - (product.price * cartItem.quantity)

    await userCart.update({
        where: {
            id: cartId
        },
        total: calcTotal
    })

    await cartItem.destroy()

    return cartItem

}

module.exports = {
    addUpdateCart,
    deleteFromCart
}
