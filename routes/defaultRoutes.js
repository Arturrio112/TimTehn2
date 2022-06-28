const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController');



router.get('/', defaultController.getIndex )

router.get('/product/:id', defaultController.getProduct)
router.get('/product/edit/:id', defaultController.getUpdateProduct)
router.put('/product/:id', defaultController.updateProduct)
router.delete('/product/:id', defaultController.deleteProduct)


router.get('/product/create', defaultController.getCreateProduct)
router.post('/product/create', defaultController.createProduct)




module.exports = router