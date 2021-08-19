const Order = require('../models/OrderModel');
const Joi = require('joi')

const createOrders = Joi.object({
    buyer: Joi.object(),
    items: Joi.array(),
    date: Joi.string(), 
    total: Joi.number()
})

const setOrder = async(req, res) => {

    const {body} = req
    const {error} = createOrders.validate(body)

    if(error) {
        const alert = error.details[0].message
        return res.status(400).json({error: alert})
    }

    try {
        const newOrder = new Order(body);
        await newOrder.save()
        res.send(newOrder._id)
    } 

    catch(e) {
        res.send(e)
    }
}

module.exports = {
    setOrder
}
