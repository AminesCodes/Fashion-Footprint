const db = require('../database/db')

const getAllVotesByProduct = async (ProductId) => {
    return await db.any('SELECT product_id, email FROM votes JOIN users ON user_id=users.id WHERE product_id=$1', ProductId);
}

const addNewVote = async (userId, productId) => {
	const voteQuery = `INSERT INTO votes(product_id, user_id) VALUES ($1, $2) RETURNING *`;
	return await db.any(voteQuery, [productId, userId]);
}


module.exports = {
    getAllVotesByProduct,
    addNewVote
}
