const Product = require('../models/products');

const getProducts = async (request, reponse) => {
    // await Product.create({
    //     "id": 1,
    //     "name": "Premium Roast Coffee",
    //     "price": 1.19,
    //     "mrp": 1.19,
    //     "stock": 1,
    //     "isPublished": false
    // })
    // await Product.create({
    //     "id": 2,
    //     "name": "name fake",
    //     "price": 2.19,
    //     "mrp": 2.19,
    //     "stock": 10,
    //     "isPublished": false
    // })
    const data = await Product.findAll({ order: [['id', 'ASC']] })
    reponse.status(200).json(data)
}

const createProduct = async (request, response) => {
    const { id, name, price, mrp, stock, isPublished } = request.body
    const product = await Product.create({
        "name": name,
        "price": price,
        "mrp": mrp,
        "stock": stock,
        "isPublished": false,
    })

    response.status(201).json(product)
}

const updateProduct = async (request, response) => {
    const { id } = request.params
    const product = await Product.findByPk(id)
    if (!product) return response.status(404).json({
        message: "product not found, try again."
    })
    const error = {
        criteria1: "MRP should be less than equal to the Price",
        criteria2: "Stock count is 0",
        errors: [
            "MRP should be less than equal to the Price",
            "Stock count is 0"
        ]
    }
    if (product.mrp < product.price && product.stock <= 0) return response.status(422).json(error.errors)
    if (product.mrp < product.price) return response.status(422).json(error.criteria1)
    if (product.stock <= 0) return response.status(422).json(error.criteria2)

    await Product.update({ isPublished: true })
    response.status(204)
}

const deleteProduct = async (request, response) => {
    response.status(405).json({
        message: "error"
    })
}
const modifyProduct = async (request, response) => {
    response.status(405).json({
        message: "error"
    })
}



module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    modifyProduct
}