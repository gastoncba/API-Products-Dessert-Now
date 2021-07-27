const e = require('express');
const express = require('express');
const router = express.Router();
const {getProducts, setProduct, updateProduct, deleteProduct} = require('../controllers/ProductController')

router.get('/api/products', (req, res) => getProducts(req, res))
router.post('/api/create', (req, res) => setProduct(req, res))
router.put('/api/update', (req, res) => updateProduct(req, res))
router.delete('/api/delete', (req, res) => deleteProduct(req, res))

module.exports = router;
