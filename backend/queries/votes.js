const db = require('../database/db')

const getAllVotesByProduct = async (ProductId) => {
    return await db.any('SELECT * FROM votes WHERE product_id=$1', ProductId);
}


module.exports = {
    getAllVotesByProduct,
}