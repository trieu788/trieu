const homeRouter = require('./home')
const productsRouter = require('./products/products')
const resproductRouter = require('./products/restoreproduct')
const categoryRouter = require('./categories/categories')
const orderRouter = require('./orders/orders')
const rescategoryRouter = require('./categories/restorecategory')

function route(app){
    // Route home "/"
    app.use('/', homeRouter)
    // Route product
    app.use('/view', productsRouter)
    app.use('/create', productsRouter)
    app.use('/update', productsRouter)
    app.use('/recovery', productsRouter)
    app.use('/delete', productsRouter)
    app.use('/product', productsRouter)
    app.use('/restore', resproductRouter)
    app.use('/forcedelete', resproductRouter)
    // Route category
    app.use('/view', categoryRouter)
    app.use('/create', categoryRouter)
    app.use('/update', categoryRouter)
    app.use('/delete', categoryRouter)
    app.use('/recovery', categoryRouter)
    app.use('/restore', rescategoryRouter)
    app.use('/forcedelete', rescategoryRouter)
    // Route Order
    app.use('/view', orderRouter)
}
module.exports = route