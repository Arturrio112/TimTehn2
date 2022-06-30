const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController');


const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: (req, file, cb ) =>{
        cb(null, "IMAGES")
    },

    filename: (req, res, cb) =>{
        cb(null, Date.now() )
    }
})
const upload = multer({storage: storage })



router.get('/product/:id', defaultController.getProduct)
router.get('/product/edit/:id', defaultController.getUpdateProduct)
router.put('/product/:id', defaultController.updateProduct)
router.delete('/product/:id', defaultController.deleteProduct)


router.get('/create', defaultController.getCreateProduct)
router.post('/create', upload.single('image123'), defaultController.createProduct)




module.exports = router