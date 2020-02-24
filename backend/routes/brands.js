const express = require('express');
const router = express.Router();

const brandsQueries = require('../queries/brands');
const { handleErrors } = require('./helpers/helpers');

router.get('/', async (request, response) => {
    try {
        const allBrands = await brandsQueries.getAllBrands()
        response.json({
            error: false,
            message: 'Successfully retrieved all the brands',
            payload: allBrands,
        })
    } catch (err) {
        handleErrors(response, err)
    }
})

module.exports = router;
