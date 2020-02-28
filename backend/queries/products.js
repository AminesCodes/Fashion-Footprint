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

const getProductByFilter = async(brand, material, type,) => await db.any(`
    SELECT * 
    FROM products 
    WHERE CAST(brand_id AS TEXT) LIKE ${brand === 'ALL' ? '%' : brand } 
    AND CAST(textile_id AS TEXT) LIKE ${material === 'ALL' ? '%' : material }
    AND CAST(type_id AS TEXT) LIKE ${type === 'ALL' ? '%' : type }
`, [brand, material, type])

const getFilteredProducts = async (brandId, typeId, textileId) => {
    if (brandId === '0' && typeId === '0' && textileId === '0') {
        return await db.any('SELECT * FROM products')
    } 

    else if (brandId === '0' && typeId === '0') {
        return await db.any(`SELECT * FROM products WHERE textile_id=$1`, textileId)
    } 

    else if (brandId === '0' && textileId === '0') {
        return await db.any('SELECT * FROM products WHERE type_id=$1', typeId)
    } 

    else if (typeId === '0' && textileId === '0') {
        return await db.any(`SELECT * FROM products WHERE brand_id=$1`, brandId)
    } 

    else if (brandId === '0') {
        return await db.any('SELECT * FROM products WHERE type_id=$1 AND textile_id=$2', [typeId, textileId])
    } 

    else if (typeId === '0') {
        return await db.any('SELECT * FROM products WHERE brand_id=$1 AND textile_id=$2', [brandId, textileId])
    } 

    else if (textileId === '0') {
        return await db.any('SELECT * FROM products WHERE brand_id=$1 AND type_id=$2', [brandId, typeId])
    } 
        
    return await db.any('SELECT * FROM products WHERE brand_id=$1 AND type_id=$2 AND textile_id=$3', [brandId, typeId, textileId])
}

const createProduct = async (brand, type, name, defaultPic, description, closingDate, material) =>{
    const insertQuery = `
    INSERT INTO products (brand_id, type_id, name, default_pic, description, closing_date, textile_id)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
     `
     return await db.one(insertQuery,[brand, type, name, defaultPic, description, closingDate, material])
}

const updateProductInfoById = async (id, type, name, defaultPic, description, closingDate, materialId) =>{
    const updateQuery = `UPDATE products 
    SET type_id=$2, name=$3, default_pic = $4, description=$5, closing_date=$6, textile_id=$7
    WHERE id=$1 RETURNING *`
    return await db.one(updateQuery, [id, type, name, defaultPic, description, closingDate, materialId])
}

const deleteProduct = async(id) =>{
    return await db.one(`DELETE FROM products WHERE id=$1 RETURNING *`, id)
}

const updateProductStatus = async (productId) => {
    const updateQuery = `
        UPDATE products 
        SET going_to_production=NOT going_to_production 
        WHERE id=$1 
        RETURNING *
    `
    return await db.one(updateQuery, productId)
}


module.exports = {
    getProductByFilter,
    getProductsByBrand,
    getProductByType,
    getProductByMaterial,
    getProductsById, 
    createProduct, 
    updateProductInfoById, 
    deleteProduct,
    getFilteredProducts,
    updateProductStatus,
}