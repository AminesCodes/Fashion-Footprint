const express = require('express');
const router = express.Router();

const typesQueries = require('../queries/types');
const { handleErrors } = require('./helpers/helpers');

router.get('/all', async (request, response) => {
    try {
        const allTypes = await typesQueries.getAllTypes();
        response.json({
            error: false,
            message: 'Successfully retrieved all types',
            payload: allTypes,
        })
    } catch (err) {
        handleErrors(response, err)
    }
})

module.exports = router;
