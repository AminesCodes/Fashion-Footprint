const db = require('../database/db')

const getBrandById = id => {
    return await db.one('Select * from brands where id = $1', id)
}

const getBrandByEmail = email => {
    return await db.one('Select * from brands where email = $1', email)
}

const createBrand = (email, password, name, businessID) => {
    const insertQuery = `
        INSERT INTO brands
            (email, password, name, business_id)
        VALUES
            ($1, $2, $3, $4) 
        RETURNING *
    `
    return await db.one(insertQuery, [email, password, name, businessID])
}

const updateBrandInfo = (id, email, name, businessID) => {
    const updateQuery = `
        UPDATE brands 
        SET email=$2, name=$3, business_id=$4
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, email, name, businessID])
}

const updateBrandPassword = (id, password) => {
    const updateQuery = `
        UPDATE brands 
        SET password=$2
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, password])
}

const deleteBrand = id => {
    return db.one('DELETE FROM brands WHERE id=$1', id)
}

module.exports = {
    getBrandById,
    getBrandByEmail,
    createBrand,
    updateBrandInfo,
    updateBrandPassword,
    deleteBrand,
}