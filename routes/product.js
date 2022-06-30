const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const {isAuthor, isLoggedIn} = require('../middleware/auth')


router.get('/', productController.getIndex )

router.get('/:id', productController.getProduct)
router.get('edit/:id', isLoggedIn, isAuthor, productController.getUpdateProduct)
router.put('/:id',isLoggedIn, isAuthor, productController.updateProduct)
router.delete('/:id',isLoggedIn, isAuthor, productController.deleteProduct)


router.get('/create', isLoggedIn, productController.getCreateProduct)
router.post('/create',isLoggedIn, productController.createProduct)




module.exports = router