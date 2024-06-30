const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')
const Cart = require('./Cart')
const Purchase = require('./Purchase')

///Al modelo Product se le esta agregando la columna cartegoryId
Product.belongsTo(Category)
Category.hasMany(Product)


//Al modelo Cart se le esta agregando la columna userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Al modelo Cart se le esta agregando la columna porductId
Cart.belongsTo(Product)
Product.hasMany(Cart)


//Al modelo Purchase se le esta agregando la columna userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Al modelo Purchase se le esta agregando la columna productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)