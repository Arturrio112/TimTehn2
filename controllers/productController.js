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
    const {id}= req.body
    Product.updateProduct(id)
    res.redirect(`/product/${id}`)
}

const deleteProduct = async (req,res) =>{
    const {id} = req.params
    await Product.deleteProduct(id)
    
    req.flash('success', 'Product DELETED!');
    res.redirect('/');
}
const getCreateProduct = async (req,res) =>{
    res.render('createListing')
}
const createProduct = async (req,res) =>{
    const {auction, name, description, img, CreatedAt} = req.body
    if(req.files){

        var file = req.files.file
        var filename
        
        file.mv(`./public/upload/${Date.now() + file.name}`, (err) =>{
            if (err) {
                filename = ''    
            }else  filename = Date.now() + file.name
              
        } )
    }

    let id = req.session.user_id
    const newProduct = new Product(id, name, description,price, Date.now(), img, auction )
    await newProduct.save()

    return res.redirect(`/user/profile/${id}`)

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