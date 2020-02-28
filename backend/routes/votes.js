const express = require('express');
const router = express.Router();

const votesQueries = require('../queries/votes');
const { handleErrors, checkValidId } = require('./helpers/helpers');

router.get('/:brandId', async (request, response) => {
    const brandId = request.params.brandId;

    if (checkValidId(response, brandId)) {
        try {
            const votes = await votesQueries.getAllVotesByProduct(brandId);
            response.json({
                error: false,
                message: `Successfully retrieved all votes to product id#${brandId}`,
                payload: votes,
            })
        } catch (err) {
            handleErrors(response, err);
        }
    }
});

module.exports = router;