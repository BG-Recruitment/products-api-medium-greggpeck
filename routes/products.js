const router = require('express').Router();
const { getProducts, createProduct, updateProduct, deleteProduct, modifyProduct } = require('../controllers/products');


router.get('/products', getProducts)
router.post('/products', createProduct)
router.patch('/products/:id', updateProduct)
router.put('/products/:id', modifyProduct)
router.delete('/products/:id', deleteProduct)



module.exports = router;
