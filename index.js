require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session');
const flash = require('connect-flash');
const notFound = require('./middleware/notFound');
const userRoutes = require('./routes/user')
const shopRoutes = require('./routes/shop')
const Logger = require('./middleware/logger')
//const appError = require('./utils/customError')


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const secret = process.env.SECRET || 'random';
const sessionConfig = {
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60,
        maxAge: 1000 * 60 * 60,
    }

}
app.use(session(sessionConfig))
app.use(flash())


app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  return next()
})



app.use('/user', userRoutes);
app.use(shopRoutes)
app.use(notFound);




const start = async () => {
    try {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      )
    } catch (error) {
      console.log(error);
    }
};
  
start();