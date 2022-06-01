const User = require('./user.model')
const Stock = require('./stock.model')
const Product = require('./product.model')
const Category = require('./category.model')
const Attribute = require('./attribute.model')
const Cart = require('./cart.model')
const CartItem = require('./cart-item.model')
const Order = require('./order.model')
const OrderItem = require('./order-item.model')

// product - stock O2O
Product.hasOne(Stock, { foreignKey: 'product_id' })
Stock.belongsTo(Product, { foreignKey: 'product_id' })
//

// product - attributes O2O
Product.hasOne(Attribute, { foreignKey: 'product_id' })
Attribute.belongsTo(Product, { foreignKey: 'product_id' })
//

// product - order-item O2O
Product.hasOne(OrderItem, { foreignKey: 'product_id' })
OrderItem.belongsTo(Product, { foreignKey: 'product_id' })
//

// product - cart-item O2O
Product.hasOne(CartItem, { foreignKey: 'product_id' })
CartItem.belongsTo(Product, { foreignKey: 'product_id' })
//

// category - product O2M
Category.hasMany(Product, { foreignKey: 'category_id' })
Product.belongsTo(Category, { foreignKey: 'category_id' })
//

// user - order M2O
User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })
//

// user - cart O2O
User.hasOne(Cart, { foreignKey: 'user_id' })
Cart.belongsTo(User, { foreignKey: 'user_id' })
//

// order - order-item M2O
Order.hasMany(OrderItem, { foreignKey: 'order_id' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })
//

// cart - cart-item M2O
Cart.hasMany(CartItem, { foreignKey: 'cart_id' })
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' })
//

module.exports = {
    User,
    Stock,
    Product,
    Category,
    Attribute,
    Cart,
    CartItem,
    Order,
    OrderItem
}
