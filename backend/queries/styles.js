const db = require('../database/db')

const getStyleById = id => {
    return await db.one(`SELECT * FROM styles WHERE id = $1`, id)
}

const getStyleByName = name =>{
    return await db.one(`SELECT * FROM styles WHERE name= $1`, name)
}

const addStyle = (name, pic) => {
    const insertQuery = `
    INSERT INTO style (name, pic) 
    VALUES ($1, $2) 
    RETURNING *`

    return await db.one(insertQuery, [name, pic])
}

const updateStyle = (id, name, pic) =>{
    const updateQuery = `
    UPDATE styles 
    SET name=$2, pic=$3 
    WHERE id=$1 
    RETURNING *`

    return await db.one(updateQuery, [id, name, pic])
}

const deleteStyle = id =>{
    return await db.one(`DELETE * FROM style WHERE id=$1`, id)
}
module.exports = {
   getStyle, 
   getStyle2,
   addStyle, 
   updateStyle,
   deleteStyle
}