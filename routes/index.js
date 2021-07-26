const e = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {getProducts, setOrder} = require('../controllers/ProductController')

mongoose.connect('mongodb+srv://gastoncba:locolope@cluster0.zvitc.mongodb.net/dessert-now-db?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log('base de datos conectada'))
.catch((e) => console.log(e))

router.get('/products', (req, res) => getProducts(req, res))

module.exports = router;
