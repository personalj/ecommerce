const {
    User,
    Cart,
    CartItem,
    Stock
} = require('../database/models')
const { getProductById } = require( './product.service')

const addItemToCart = async (cartId, productId, quantity) => {
    await CartItem.create({
        cartId: cartId,
        productId: productId,
        quantity: quantity
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

        const userCart = user && await Cart.findOne({
            where: {
                userId: user.id
            },
            include: [{
                model: CartItem
            }],
        })

        if (!userCart || userCart.isClosed) {
            const cart = await Cart.create({
                ...cartInfo,
                userId: user.id,
                total: calcTotal,
                isClosed: false
            })

           for(const item of cartInfo.items) {
               await CartItem.create({
                   cartId: cart.id,
                   productId: item.id,
                   quantity: item.quantity
               })
               await addItemToCart(cart.id, item.id, item.quantity)
           }
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


        return userCart

    } catch(e) {
        throw new Error(e)
    }
}


function orderProductIds(ids) {
    const productIds = []

    for (const order of ids) {
        productIds.push(order.id)
    }

    return productIds
}


module.exports = {
    addUpdateCart
}
