const db = require('../database/db')

const getAllFacts = async () => {
    return await db.any('SELECT * FROM facts')
}

module.exports = {
    getAllFacts,
}