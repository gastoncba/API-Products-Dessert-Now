const Product = require('../models/ProductModel')
const Joi = require('joi')

const createProducts = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
})

const getProducts =  async (req, res) => {

    try {
        const products = await Product.find();
        res.json(products)
    }
    catch(e) {
        res.send(e)
    }
}

const getProductID = async (req, res) => {

    const {params} = req
    const {id} = params; 

    try {
        const product = await Product.findById(id)
        res.json(product)
    }   
    catch(e) {
        res.send(e)
    }
}

const setProduct = async (req, res) => {
    
    const {body} = req
    const {error} = createProducts.validate(body)

    if(error) {
        const alert = error.details[0].message
        return res.status(400).json({error: alert})
    }

    try {
        const newProduct = new Product(body);
        await newProduct.save()
        res.send(`se agrego producto`)
    } 

    catch(e) {
        res.send(e)
    }
}

const updateProduct = async (req, res) => {

    const {params} = req
    const {id} = params
    const {body} = req

    try {
        await Product.updateOne({_id:id}, {
            $set:{
                name: body.name, 
                description: body.description, 
                price: body.price, 
                stock: body.stock, 
            }  
        })

        res.send(`se modifico el producto de id: ${id}`)
    } 

    catch(e) {
        console.log(e)
    }
}

const updateStock = async (req, res) => {

    const {params} = req
    const {id} = params
    const {body} = req

    try {
        await Product.updateOne({_id:id}, {
            $set:{ 
                //se le asiga el nuevo stock
                stock: body.stock, 
            }  
        })

        res.send(`se modifico el stock del producto de id: ${id}`)
    } 

    catch(e) {
        console.log(e)
    }
}

const deleteProduct = async (req, res) => {

    const {params} = req
    const {id} = params

    try {
        await Product.deleteOne({_id:id})
        res.send(`se elimino el producto de id: ${id}`)
    }

    catch(e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    setProduct, 
    updateProduct,
    updateStock,
    deleteProduct,
    getProductID
}