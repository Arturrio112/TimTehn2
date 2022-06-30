const {config} = require('./connectToDB')
const sql = require('mssql')

class User {
    constructor(username, email, password, telephone, role){
       this.username = username
       this.email = email
       this.password = password
       this.telephone = telephone
       this.role = role
    }

    async save(){
        let d = new Date()
        let yyyy = d.getFullYear()
        let mm = d.getMonth()
        let dd = d.getDate()

        let createAtDate = `${yyyy}-${mm}-${dd}`


        let conn = await sql.connect(config)
        let newProduct = await  sql.query `INSERT INTO Users( email, password, telephone, created_at, role) VALUES (${this.email}, ${this.password}, ${this.telephone}, ${createAtDate}, 'user') `
        conn.close()
        return newProduct
    }

   

    static async findByEmail(email) {
        
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM users WHERE email = ${email}`
        result = result.recordset
        conn.close()
        return result
    }


}

module.exports = User