function orderProductIds(ids) {
    const productIds = []

    for (const order of ids) {
        productIds.push(order.id)
    }

    return productIds
}

module.exports ={
    orderProductIds
}
