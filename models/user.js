const {config} = require('./DBconfig')
const sql = require('mssql')

class User {
    constructor(username, email, password, telephone="none", role){
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

       


        let conn = await sql.connect(config)
        let newProduct = await  sql.query `INSERT INTO Users( email, password, telephone, role, createdAt) VALUES (${this.email}, ${this.password}, ${this.telephone},${this.role} ,${d}) `
        conn.close()
        return newProduct
    }

   

    static async findByEmail(email) {
        
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM users WHERE email = ${email}`
        result = result.recordset[0]
        conn.close()
        return result
    }

    static async findByID(id) {
        
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM users WHERE userID = ${id}`
        result = result.recordset[0]
        conn.close()
        return result
    }

    static async findAllItemsOfOwner(id){
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM users WHERE produktsID = ${id}`
        result = result.recordset
        conn.close()
        return result
    }

}



module.exports = User