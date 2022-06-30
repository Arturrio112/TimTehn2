if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
  
  
  
  const express = require('express')
  const app = express()
  const session = require('express-session');
  const flash = require('connect-flash');
  const upload  = require('express-fileupload')
  const path = require("path");
  
  const userRoutes = require('./routes/user')
  const productRoutes = require('./routes/product');
  const notfound = require('./middleware/notFound')
  
  
  app.set('view engine', 'ejs');
  app.set('views', 'views');
  app.use(express.urlencoded({ extended: true }))
  app.use('/public', express.static('public'));
  app.use(express.static('public'))
  app.use(express.json())
  app.use(upload())
  
  const secret = process.env.SECRET || 'random';
  const sessionConfig = {
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
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
  
  
  
  app.use('/product', productRoutes)
  app.use('/user', userRoutes)
  app.use(notfound)
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))