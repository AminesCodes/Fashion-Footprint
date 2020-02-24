const db = require('../database/db')

const getAllBrands = async () => {
    return await db.any('SELECT id, name FROM brands')
}

const getBrandById = async (id) => {
    return await db.one('SELECT id, name FROM brands WHERE id = $1', id)
}

const getBrandByEmail = async (email) => {
    return await db.one('SELECT * FROM brands WHERE email = $1', email)
}

const createBrand = async (email, password, name, businessID) => {
    const insertQuery = `
        INSERT INTO brands
            (email, password, name, business_id)
        VALUES
            ($1, $2, $3, $4) 
        RETURNING *
    `
    return await db.one(insertQuery, [email, password, name, businessID])
}

const updateBrandInfo = async (id, email, name, businessID) => {
    const updateQuery = `
        UPDATE brands 
        SET email=$2, name=$3, business_id=$4
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, email, name, businessID])
}

const updateBrandPassword = async (id, password) => {
    const updateQuery = `
        UPDATE brands 
        SET password=$2
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, password])
}

const deleteBrand = async (id) => {
    return await db.one('DELETE FROM brands WHERE id=$1', id)
}

module.exports = {
    getAllBrands,
    getBrandById,
    getBrandByEmail,
    createBrand,
    updateBrandInfo,
    updateBrandPassword,
    deleteBrand,
}