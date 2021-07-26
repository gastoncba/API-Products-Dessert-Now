const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    name: String, 
    description: String, 
    img: String, 
    price: Number, 
    stock: Number, 
    category: Number
})

//se crea el modelo.
const product = mongoose.model('product', productSchema);

module.exports = product;