const db = require('../database/db')

const getAllVotesByProduct = async (ProductId) => {
    return await db.any('SELECT product_id, email FROM votes JOIN users ON user_id=users.id WHERE product_id=$1', ProductId);
}

const addNewVote = async (userId, productId) => {
	const voteQuery = `INSERT INTO votes(product_id, user_id) VALUES ($1, $2) RETURNING *`;
	return await db.any(voteQuery, [productId, userId]);
}

const checkIfVoteExists = async (productId, userId) => {
    return db.oneOrNone('SELECT * FROM votes WHERE product_id = $1 AND user_id = $2', [productId, userId]);
}


module.exports = {
    getAllVotesByProduct,
    addNewVote,
    checkIfVoteExists,
}
