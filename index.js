const express = require('express')
const app = express()

const defaultRoute = require('./routes/default')

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.use(defaultRoute)


app.listen(3000, () => {
    
})