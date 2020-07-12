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
            willing_to_buy,
            coupon
        FROM wishlists JOIN products ON wishlists.product_id = products.id
            JOIN brands ON brand_id = brands.id
            JOIN textiles ON textile_id = textiles.id
            LEFT JOIN votes ON wishlists.product_id = votes.product_id
                AND wishlists.user_id = votes.user_id
        WHERE wishlists.user_id = $1
    `
    return await db.any(selectQuery, id)
}

const createWishlistItem = async (product_id, user_id, willingToBuy = false) => {
    const insertQuery = `
        INSERT INTO wishlists
            (product_id, user_id, willing_to_buy)
        VALUES
            ($1, $2, $3) 
        RETURNING *
    `

    return await db.one(insertQuery, [product_id, user_id, willingToBuy])
}

const updateWishlistItem = async (id, willingToBuy) => {
    const updateQuery = `
        UPDATE wishlists
        SET willing_to_buy=$2
        WHERE id=$1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, willingToBuy]);
}

// const createVote = async (id) =>  {
//     const createdVote = `
//      INSERT INTO votes (product_id, user_id)
//         VALUES ((SELECT product_id FROM wishlists WHERE id=$1), (SELECT user_id FROM wishlists WHERE id=$1))
//         RETURNING *
//     `
//     return await db.one(createdVote, [id]);
// }

const deleteVote = async (id) => {
    const deletedVote = `
    DELETE FROM votes 
    WHERE id = $1 
    RETURNING *
`;
    return await db.one(deletedVote, id);
};

const deleteWishlistItem = async (id) => {
    return db.one('DELETE FROM wishlists WHERE id=$1 RETURNING *', id)

}
const checkIfWishExists = async (prodId, userId) => {
    return db.oneOrNone('SELECT * FROM wishlists WHERE product_id = $1 AND user_id = $2', [prodId, userId]);
}

const getAllVotesByProduct = async (ProductId) => {
    return await db.any('SELECT wishlists.id, product_id, email FROM wishlists JOIN users ON user_id=users.id WHERE product_id=$1', ProductId);
}

const addCoupon = async (wishId, coupon) => {
    return await db.one('UPDATE wishlists SET coupon=$2 WHERE id=$1 RETURNING *', [wishId, coupon])
}

const deleteCoupon = async (wishId) => {
    return await db.one('UPDATE wishlists SET coupon=NULL WHERE id=$1 RETURNING *', wishId)
}

module.exports = {
    getWishlistByUserId, 
    createWishlistItem, 
    updateWishlistItem,
    deleteWishlistItem,
    // createVote,
    deleteVote,
    checkIfWishExists,
    getAllVotesByProduct,
    addCoupon,
    deleteCoupon
}

