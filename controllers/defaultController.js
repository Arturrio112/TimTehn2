const Product = require('../models/product')

const getIndex = async (req,res) =>{
    let data = await Product.getAllProducts()
    res.render('index', {data})
}
const getProduct = async (req,res) =>{
    
    const {id} = req.params
    let data = await Product.getProductWithID(id)
    res.render('product', {data})
}
const getUpdateProduct = async (req,res) =>{
    const {id} = req.params
    let data = await Product.getProductWithID(id)
    res.render('updateProduct', {data})
}
const updateProduct = async (req,res) =>{
    //res.render('index')
}

const deleteProduct = async (req,res) =>{
    const {id} = req.params
    await Product.deleteProduct(id)
    
    req.flash('success', 'Product DELETED!');
    res.redirect('/');
}
const getCreateProduct = async (req,res) =>{
    //res.render('index')
}
const createProduct = async (req,res) =>{
    //res.render('index')
}

module.exports = {
    getIndex,
    getProduct,
    getUpdateProduct,
    updateProduct,
    deleteProduct,
    getCreateProduct,
    createProduct,

}