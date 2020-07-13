const db = require('../database/db')

const getProductsByBrand = async(id) =>{
return await db.any(`SELECT * FROM products WHERE brand_id =$1 ORDER BY closing_date, id`, id)
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

const getFilteredProducts = async (userId, brandId, typeId, textileId) => {
    const basicQuery = `
        SELECT 
            DISTINCT products.id AS id,
            brands.name AS brand_name,
            products.name AS name,
            default_pic,
            description,
            closing_date,
            textiles.name AS material,
            going_to_production
        FROM products JOIN textiles ON textile_id = textiles.id
            JOIN brands ON brand_id = brands.id
            LEFT JOIN wishlists ON product_id = products.id 
            LEFT JOIN 
                (SELECT product_id AS p_id, ARRAY_AGG(user_id) AS users_list FROM wishlists GROUP BY product_id) AS list 
                ON product_id = p_id 
		WHERE NOT ($1 = ANY (users_list)) OR users_list IS NULL
    `
    if (brandId === '0' && typeId === '0' && textileId === '0') {
        return await db.any(`${basicQuery}`, userId)
    } 

    else if (brandId === '0' && typeId === '0') {
        return await db.any(`${basicQuery} AND textile_id=$2`, [userId, textileId])
    } 

    else if (brandId === '0' && textileId === '0') {
        return await db.any(`${basicQuery} AND type_id=$2`, [userId, typeId])
    } 

    else if (typeId === '0' && textileId === '0') {
        return await db.any(`${basicQuery} AND brand_id=$2`, [userId, brandId])
    } 

    else if (brandId === '0') {
        return await db.any(`${basicQuery} AND type_id=$2 AND textile_id=$3`, [userId, typeId, textileId])
    } 

    else if (typeId === '0') {
        return await db.any(`${basicQuery} AND brand_id=$2 AND textile_id=$3`, [userId, brandId, textileId])
    } 

    else if (textileId === '0') {
        return await db.any(`${basicQuery} AND brand_id=$2 AND type_id=$3`, [userId, brandId, typeId])
    } 
        
    return await db.any(`${basicQuery} AND brand_id=$2 AND type_id=$3 AND textile_id=$4`, [userId, brandId, typeId, textileId])
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

const updateProductStatus = async (productId, production) => {
    const updateQuery = `
        UPDATE products 
        SET going_to_production=$2
        WHERE id=$1 
        RETURNING *
    `
    return await db.one(updateQuery, [productId, production])
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