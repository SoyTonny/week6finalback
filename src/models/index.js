const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')
const Cart = require('./Cart')
const Purchase = require('./Purchase')

//ProductId ---> Category
Product.belongsTo(Category)
Category.hasMany(Product)


//UserId ---> Cart
Cart.belongsTo(User)
User.hasMany(Cart)

//ProductId ---> Cart
Cart.belongsTo(Product)
Product.hasMany(Cart)


//UserId ---> Purchase
Purchase.belongsTo(User)
User.hasMany(Purchase)

//ProductId ---> Purchase
Purchase.belongsTo(Category)
Category.hasMany(Purchase)