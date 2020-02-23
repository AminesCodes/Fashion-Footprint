const db = require('../database/db')

const getWishlistByUserId = async (id) => {
    return await db.one('Select * from wishlist where id = $1', id)
}

const createWishlistItem = async (product_id, user_id, style_id) => {
    const insertQuery = `
        INSERT INTO wishlist
            (product_id, user_id, style_id)
        VALUES
            ($1, $2, $3) 
        RETURNING *
    `
    return await db.one(insertQuery, [product_id, user_id, style_id])
}

const updateWishlistItem = async (id) => {
    const updateQuery = `
        UPDATE users 
        SET willing_to_buy = opposite_of(willing_to_buy)
        WHERE id = $1
        RETURNING *
    `
    return await db.one(updateQuery, [id])
}

const deleteWishlistItem = async (id) => {
    return db.one('DELETE FROM wishlist WHERE id = $1 RETURNING *', id)
}

module.exports = {
    getWishlistByUserId, 
    createWishlistItem, 
    updateWishlistItem,
    deleteWishlistItem
}