const User = require('../models/user')
const bcrypt = require('bcrypt')


const getRegisterPage =  async (req,res) =>{
    res.render('signup')
}

const register = async (req,res) =>{
    
    try{
        const {password, username, email, telephone } = req.body
       
        let data = await  User.findByEmail(email)
        let doesAccExist = data.length == 0 ? false : true
        
        if(doesAccExist){
            console.log("account already exists")
            req.flash('error', 'account already exists');
            res.render('signup')
        }else{
            const hash = await bcrypt.hash(password, 12)
            const newUser = new User(username, email, hash, telephone, 0)
            await newUser.save()
            let data = await  User.findByEmail(email)
            req.session.user_id = data[0]['UserID']
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
                req.session.user_id = data[0]['UserID']
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


module.exports = {
    getRegisterPage,
    register,
    getLoginPage,
    login,
    logout
}