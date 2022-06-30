const {config} = require('./DBconfig')
const sql = require('mssql')


class Product {
    constructor(userID, name, description, price, createdAt, img, auction){
        this.userID = userID
        this.name = name
        this.description = description
        this.price= price
        this.createdAt = createdAt
        this.img = img
        this.auction = auction
    }

    async save(){
  
        let conn = await sql.connect(config)
        let newProduct = await  sql.query `INSERT INTO Produkts( userID, name, description, price createdAt, img , auction) VALUES (${this.userID}, ${this.name}, ${this.description},${this.price} ,${Date.now()}, ${img}, ${this.auction}) `
        conn.close()
        return newProduct
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
        let result = await sql.query `SELECT * FROM Produkts WHERE ProduktsID = ${id}`
        result = result.recordset[0]
        conn.close()
        return result
    }

    static async updateProduct(id, data){
        let conn = await sql.connect(config)
        const { name, description, price, img} = req.body
        let result = await sql.query `UPDATE Produkts SET name=${name}, description=${description}, price= ${price}, img=${img}  WHERE ProduktsID = ${id}`
        result = result.recordset[0]
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