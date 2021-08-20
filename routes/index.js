const express = require('express');
const router = express.Router();
const {getProducts, setProduct, updateProduct, deleteProduct, updateStock, getProductID} = require('../controllers/ProductController')
const {register, login} = require('../controllers/UserController')
const {setOrder} = require('../controllers/OrderController')
const {verifyToken, isAdmin} = require('../middleware/authJwt');
const { getCategories } = require('../controllers/CategoryController');

//productos
router.get('/api/products', (req, res) => getProducts(req, res))
router.post('/api/create', [verifyToken, isAdmin] ,(req, res) => setProduct(req, res))
router.put('/api/update/:id',[verifyToken, isAdmin] ,(req, res) => updateProduct(req, res))
router.put('/api/update-stock/:id', (req, res) => updateStock(req, res))
router.delete('/api/delete/:id', [verifyToken, isAdmin] ,(req, res) => deleteProduct(req, res))
router.get('/api/products/:id', (req, res) => getProductID(req, res))

//orders
router.post('/api/create-order', (req, res) => setOrder(req, res))

//users
router.post('/api/register', (req, res) => register(req, res))
router.post('/api/login', (req, res) => login(req, res))

//categories
router.get('/api/categories', (req, res) => getCategories(req, res))

module.exports = router;
