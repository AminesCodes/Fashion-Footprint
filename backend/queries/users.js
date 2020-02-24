const db = require('../database/db')

const getUserById = async (id) => {
    return await db.one('Select * from users where id = $1', id)
}

const getUserByEmail = async (email) => {
    return await db.one('Select * from users where email = $1', email)
}

const createUser = async (email, password, firstName, lastName) => {
    const insertQuery = `
        INSERT INTO users
            (email, password, firstname, lastname)
        VALUES
            ($1, $2, $3, $4) 
        RETURNING *
    `
    return await db.one(insertQuery, [email, password, firstName, lastName])
}

const updateUserInfo = async (id, email, firstName, lastName) => {
    const updateQuery = `
        UPDATE users 
        SET email=$2, firstname=$3, lastname=$4
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, email, firstName, lastName])
}

const updateUserPassword = async (id, password) => {
    const updateQuery = `
        UPDATE users 
        SET password=$2
        WHERE id = $1 
        RETURNING *
    `
    return await db.one(updateQuery, [id, password])
}

const deleteUser = async (id) => {
    return await db.one('DELETE FROM users WHERE id=$1', id)
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
}