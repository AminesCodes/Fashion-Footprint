const db = require('../database/db')

const getAllTypes = async() =>{
return await db.any(`SELECT * FROM types`)
}

const getTypeByName = async(name) =>{
    return await db.one(`SELECT * FROM types WHERE name=$1`, name)
}

const getTypeById = async (id) => {
    return await db.one('Select * from types where id = $1', id)
}

module.exports = {
    getAllTypes, 
    getTypeByName,
    getTypeById
}