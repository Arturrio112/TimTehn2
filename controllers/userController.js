const User = require('../models/user')
const bcrypt = require('bcrypt')


const getRegisterPage =  async (req,res) =>{
    res.render('signup')
}

const register = async (req,res) =>{

    
    
    try{
        const {name, email, password, telephone} = req.body
        
        if(req.files){

            var file = req.files.file
            var filename
            
            file.mv(`./public/upload/${Date.now() + file.name}`, (err) =>{
                if (err) {
                    filename = ''    
                }else  filename = Date.now() + file.name
                  
            } )
        }

        let data = await  User.findByEmail(email)
        let doesAccExist = data ? true: false
        
       
    
        if(doesAccExist){
            req.flash('error', 'account already exists');
            res.render('signup')
        }else{
            const hash = await bcrypt.hash(password, 12)
            const newUser = new User(username, email, hash, '', 0)
            await newUser.save()
            let data = await  User.findByEmail(email)
            req.session.user_id = data[0]['userID']
            req.flash('success', 'You Have Sucsessfully Creaated An Account!');
            res.redirect('/');
        }
    } catch (e) {
        req.flash('error', "Something Went Wrong!");
        res.redirect('/');
    }
   

   
}

const getLoginPage =  async (req,res) =>{
    res.render('login')
}

const login =  async (req,res) =>{
   
        const {password, username, email } = req.body
       
        let data = await  User.findByEmail(email)
        let doesAccExist = data.length == 0 ? false : true

        if(doesAccExist){
            const validPass = await bcrypt.compare(password, data[0]['password']) 
            if(validPass){
                req.session.user_id = data['userID']
                req.session.isAdmin = data["admin"] == 1 ? true : false
                req.flash('success', 'You Have Sucsessfully Logged In!');
                res.redirect('/');
            }else{
                console.log("password or email is incorrect")
            }
        }else{
            console.log("password or email is incorrect")
        }
        
    
}

const logout =  async (req,res) =>{
    req.logout()
    req.flash('success', "Goodbye!");
    res.redirect('/');
}

const getProfilePage = async (req,res) =>{
    const {id} = req.params
    let profile = await User.findByID(id)
    let products = await User.findAllItemsOfOwner(id)
    let isAuthor = false
    if(user.session.user_id == id){
        isAuthor = true
        return res.render('profile', {profile, products, isAuthor})
    }
    return res.render('profile', {profile, isAuthor})
}


module.exports = {
    getRegisterPage,
    register,
    getLoginPage,
    login,
    logout,
    getProfilePage
}


module.exports = {
    getRegisterPage,
    register,
    getLoginPage,
    login,
    logout
}