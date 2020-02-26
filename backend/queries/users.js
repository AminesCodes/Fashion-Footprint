const db = require('../database/db')

const getUserById = async (id) => {
    return await db.one('Select * from users where id = $1', id)
}

const getUserByEmail = async (email) => {
    return await db.oneOrNone('Select * from users where email = $1', email)
}

const createUser = async (email, password, firstName, lastName) => {
    const insertQuery = `
        INSERT INTO users
            (email, password, firstname, lastname, agreed_on_terms)
        VALUES
            ($1, $2, $3, $4, TRUE) 
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
    return await db.one('DELETE FROM users WHERE id=$1 RETURNING *', id)
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
}