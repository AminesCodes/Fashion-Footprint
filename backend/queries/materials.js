const db = require('../database/db')

const getAllMaterials = async () => {
    return await db.any('Select * from textiles')
}

const getMaterialById = async (id) => {
    return await db.one('Select * from users where id = $1', id)
}

const getMaterialByName = async (name) => {
    return await db.one('Select * from users where name = $1', name)
}

module.exports = {
    getAllMaterials,
    getMaterialById,
    getMaterialByName
}