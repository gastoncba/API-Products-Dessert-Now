const express = require('express');
const router = express.Router();
const {getProducts, setProduct, updateProduct, deleteProduct} = require('../controllers/ProductController')
const {register, login} = require('../controllers/UserController')
const {verifyToken, isAdmin} = require('../middleware/authJwt')

//productos
router.get('/api/products', (req, res) => getProducts(req, res))
router.post('/api/create', [verifyToken, isAdmin] ,(req, res) => setProduct(req, res))
router.put('/api/update/:id',[verifyToken, isAdmin] ,(req, res) => updateProduct(req, res))
router.delete('/api/delete/:id', [verifyToken, isAdmin] ,(req, res) => deleteProduct(req, res))

//users
router.post('/api/register', (req, res) => register(req, res))
router.post('/api/login', (req, res) => login(req, res))

module.exports = router;
