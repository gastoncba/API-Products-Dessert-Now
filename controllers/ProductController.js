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

const setProduct = async (req, res) => {

    const {body} = req

    try {
        const newProduct = new product(body);
        await newProduct.save()
        res.send(`se agrego producto`)
    } 

    catch(e) {
        res.send(e)
    }
}

const updateProduct = async (req, res) => {

    const {body} = req
    const ID = body._id

    try {
        await product.updateOne({_id:ID}, {
            $set:{
                name: body.name, 
                description: body.description, 
                img: body.img, 
                price: body.price, 
                stock: body.stock, 
                category: body.category
            }  
        })

        res.send(`se modifico el producto de id: ${ID}`)
    } 

    catch(e) {
        console.log(e)
    }
}

const deleteProduct = async (req, res) => {

    const {body} = req
    const ID = body._id

    try {
        await product.deleteOne({_id:ID})
        res.send(`se elimino el producto de id: ${ID}`)
    }

    catch(e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    setProduct, 
    updateProduct,
    deleteProduct
}