const db = require('../database/db')

const getProductsById = async(id) =>{
return await db.one(`SELECT * FROM products WHERE id =$1`, id)
}

const createProduct = async (id, brand, type, name, defaultPic, description, closingDate) =>{
    const insertQuery = `
    INSERT INTO products (id, brand, type, name, defaultPic, description, closingDate)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
     `
     return await db.one(insertQuery,[id, brand, type, name, defaultPic, description, closingDate])
}

const updateProductInfoById = async (id, type, name, defaultPic, description, closingDate) =>{
    const updateQuery = `UPDATE products 
    SET type=$2, name=$3, defaultPic = $4, description=$5, closingDate=$6 
    WHERE id=$1 RETURNING *`
    return await db.one(updateQuery, [id, type, name, defaultPic, description, closingDate])
}

const deleteProduct = async(id) =>{
    return await db.one(`DELETE * FROM products WHERE id=$1`, id)
}

module.exports = {
getProductsById, 
createProduct, 
updateProductInfoById, 
deleteProduct
}