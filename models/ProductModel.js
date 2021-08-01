const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    name: String, 
    description: String, 
    price: Number, 
    stock: Number, 
    
}, {versionKey:false}) //versionKey:false lo ponemos para que no aparesca despues en el campo __v

//se crea el modelo.
const Product = mongoose.model('product', productSchema);

module.exports = Product;