const db = require('../database/db')

const getAllVotesByProduct = async (ProductId) => {
    return await db.any('SELECT product_id, email FROM votes JOIN users ON user_id=users.id WHERE product_id=$1', ProductId);
}


module.exports = {
    getAllVotesByProduct,
}