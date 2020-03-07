const db = require('../database/db')

const getWishlistByUserId = async (id) => {
    const selectQuery = `
        Select 
            wishlists.id AS wishlist_id,
            brands.name AS brand_name,
            products.name AS product_name,
            default_pic,
            description,
            closing_date,
            textiles.name AS material,
            going_to_production,
            willing_to_buy
        FROM wishlists JOIN products ON wishlists.product_id = products.id
            JOIN brands ON brand_id = brands.id
            JOIN textiles ON textile_id = textiles.id
        WHERE user_id = $1
    `
    return await db.any(selectQuery, id)
}

const createWishlistItem = async (product_id, user_id) => {
    const insertQuery = `
        INSERT INTO wishlists
            (product_id, user_id)
        VALUES
            ($1, $2) 
        RETURNING *
    `
    return await db.one(insertQuery, [product_id, user_id])
}

const updateWishlistItem = async (id) => {
    const updateQuery = `
        UPDATE wishlists
        SET willing_to_buy = NOT willing_to_buy
        WHERE id=$1 
        RETURNING *
    `
    return await db.one(updateQuery, [id])
}

const createVote = async (id) =>  {
    const createdVote = `
     INSERT INTO votes (product_id, user_id)
        VALUES ((SELECT product_id FROM wishlists WHERE id=$1), (SELECT user_id FROM wishlists WHERE id=$1))
        RETURNING *
    `
    return await db.one(createdVote, [id]);
}

const deleteVote = async (id) => {
    const deletedVote = `
    DELETE FROM votes 
    WHERE product_id = (SELECT product_id FROM wishlists WHERE id=$1) 
    AND user_id = (SELECT user_id FROM wishlists WHERE id=$1) 
    RETURNING *
`;
    return await db.one(deletedVote, [id]);
};

const deleteWishlistItem = async (id) => {
    return db.one('DELETE FROM wishlists WHERE id=$1 RETURNING *', id)

}
const checkIfWishExists = async (prodId, userId) => {
    return db.oneOrNone('SELECT * FROM wishlists WHERE product_id = $1 AND user_id = $2', [prodId, userId]);
}

module.exports = {
    getWishlistByUserId, 
    createWishlistItem, 
    updateWishlistItem,
    deleteWishlistItem,
    createVote,
    deleteVote,
    checkIfWishExists

}

