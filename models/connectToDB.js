require('dotenv').config()
const sql = require('mssql')

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options:{
        trustServerCertificate: true,
    },
}


module.exports = {config}