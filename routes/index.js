import products from 'routes/products'

export default (app) => {

    app.use('/products', products)

}