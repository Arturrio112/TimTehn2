require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session');
const flash = require('connect-flash');
<<<<<<< HEAD
//const notFound = require('./middleware/notFound');
const userRoutes = require('./routes/user')
//const shopRoutes = require('./routes/shop')
//const Logger = require('./middleware/logger')
//const appError = require('./utils/customError')
=======
const userRoutes = require('./routes/user')
const defaultRoutes = require('./routes/defaultRoutes')
>>>>>>> 0954687b1e80706ed08885b055cea707284caf8b


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
<<<<<<< HEAD

=======
app.use(express.static('public'))
>>>>>>> 0954687b1e80706ed08885b055cea707284caf8b

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

app.use(defaultRoutes)
app.use('/user', userRoutes);
<<<<<<< HEAD
//app.use(shopRoutes)
//app.use(notFound);
=======

>>>>>>> 0954687b1e80706ed08885b055cea707284caf8b




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