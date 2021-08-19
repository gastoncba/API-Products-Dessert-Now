const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const orderSchema = new Schema({
    buyer: {name: String, email: String, phone: String},
    items: [{title: String, _id: Schema.Types.ObjectId , price: Number, quantity: Number}, {versionKey: false}], 
    date: String,
    total: Number
}, {versionKey: false})

const Order = mongoose.model('order', orderSchema)

module.exports = Order;