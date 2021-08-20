const Category = require('../models/CategoryModel')

const getCategories = async(req, res) => {
    
    try {
        const categories = await Category.find()
        res.json(categories)
    }
    catch(e) {
        console.log(e)
    }
}

module.exports = {
    getCategories
}