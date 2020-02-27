const express = require('express');
const router = express.Router();

const typesQueries = require('../queries/types');
const { handleErrors } = require('./helpers/helpers');


router.get('/', async (request, response) => {
    try {
        const allTypes = await typesQueries.getAllTypes()
        response.json({
            error: false,
            message: 'Successfully retrieved all the types',
            payload: allTypes,
        })
    } catch (err) {
        handleErrors(response, err)
    }
})

router.get('/:idOrName', async (request, response) => {
    let idOrName = Number(req.params.idOrName)
    try {
        if(isNaN(idOrName)){
        const typesByName = await typesQueries.getTypeByName(idOrName)
        response.status(200).json({
            error: false,
            message: 'Successfully retrieved all the types',
            payload: typesByName,
        })
    } else{
        let typeById = await typesQueries.getTypeById(idOrName)
        response.status(200).json({
            error: false,
            message: 'Successfully retrieved all the types',
            payload: typeById,
        })
    }
    } catch (err) {
        handleErrors(response, err)
    }
})


module.exports = router;