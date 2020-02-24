const express = require('express');
const router = express.Router();

const factsQueries = require('../queries/facts');
const { handleErrors } = require('./helpers/helpers');

router.get('/random', async (request, response) => {
    console.log("HERE")
    try {
        const allFacts = await factsQueries.getAllFacts();
        const randomId = Math.floor(Math.random()*allFacts.length);
        response.json({
            error: false,
            message: 'Successfully retrieved a random fact',
            payload: allFacts[randomId],
        })
    } catch (err) {
        handleErrors(response, err)
    }
})

module.exports = router;
