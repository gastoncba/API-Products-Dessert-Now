const product = require('../models/ProductModel')

const getProducts =  async (req, res) => {
    try {
        const products = await product.find();
        res.json(products)
    }
    catch(e) {
        res.send(e)
    }
}

const setOrder = (req, res) => {

}

module.exports = {
    getProducts,
    setOrder
}