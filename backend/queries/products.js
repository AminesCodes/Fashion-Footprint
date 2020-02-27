const db = require('../database/db')

const getProductsByBrand = async(id) =>{
return await db.any(`SELECT * FROM products WHERE brand_id =$1`, id)
}

const getProductsById = async(id) =>{
    return await db.any(`SELECT * FROM products WHERE id =$1`, id)
}

const getProductByType = async (id) => {
    return await db.any(`SELECT * FROM products WHERE type_id =$1`, id)
}

const getProductByMaterial = async(id) => {
    return await db.any(`SELECT * FROM products WHERE textile_id = $1`, id)
}

const createProduct = async (brand, type, name, defaultPic, description, closingDate, material) =>{
    const insertQuery = `
    INSERT INTO products (brand_id, type_id, name, default_pic, description, closing_date, textile_id)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
     `
     return await db.one(insertQuery,[brand, type, name, defaultPic, description, closingDate, material])
}

const updateProductInfoById = async (id, type, name, defaultPic, description, closingDate) =>{
    const updateQuery = `UPDATE products 
    SET type_id=$2, name=$3, default_pic = $4, description=$5, closing_date=$6 
    WHERE id=$1 RETURNING *`
    return await db.one(updateQuery, [id, type, name, defaultPic, description, closingDate])
}

const deleteProduct = async(id) =>{
    return await db.one(`DELETE * FROM products WHERE id=$1 RETURNING *`, id)
}


module.exports = {
    getProductsByBrand,
    getProductByType,
    getProductByMaterial,
    getProductsById, 
createProduct, 
updateProductInfoById, 
deleteProduct
}