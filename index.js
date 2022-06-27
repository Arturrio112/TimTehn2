const express = require('express')
//const mysql = require('mysql')
const app = express()

const defaultRoute = require('./routes/default')
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'

});
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE database';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created');
    });
});*/
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.use(defaultRoute)


app.listen(3000, () => {

})