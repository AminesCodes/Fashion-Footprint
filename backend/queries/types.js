const db = require('../database/db')

const getAllTypes = async () => {
    return await db.any('SELECT * FROM types')
}

module.exports = {
    getAllTypes,
}