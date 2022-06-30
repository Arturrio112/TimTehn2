const {config} = require('./connectToDB')
const sql = require('mssql')


class Product {
    constructor(userID, name, description, price, createdAt, status, auction){
        this.userID = userID
        this.name = name
        this.description = description
        this.price= price
        this.createdAt = createdAt
        this.status = status
        this.auction = auction
    }

    static async getAllProducts(){
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM Produkts`
        result = result.recordset
        conn.close()
        return result
    }

    static async getProductWithID(id){
        let conn = await sql.connect(config)
        let result = await sql.query `SELECT * FROM Produkts WHERE ProduktsID= ${id}`
        result = result.recordset[0]
        conn.close()
        return result
    }

    static async updateProduct(id, data){
        let conn = await sql.connect(config)
        //let result = await sql.query `UPDATE Produkts SET name=${}, description=${}, price= ${}, WHERE ProductID = ${id}`
        result = result.recordset
        conn.close()
        return result
    }

    static async deleteProduct(id){
        let conn = await sql.connect(config)
        await sql.query `DELETE FROM Produkts WHERE ProduktsID = ${id}`
        
        conn.close()
    }

}

module.exports = Product