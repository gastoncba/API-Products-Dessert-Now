const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    name: String, 
    description: String, 
    img: String, 
    price: Number, 
    stock: Number, 
    category: Number
}, {versionKey:false}) //versionKey:false lo ponemos para que no aparesca despues en el campo __v

//se crea el modelo.
const product = mongoose.model('products', productSchema);

module.exports = product;