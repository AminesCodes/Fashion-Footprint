const express = require('express');
const router = express.Router();

const wishQuery = require('../queries/wishlist');
const { handleErrors, checkValidId } = require('./helpers/helpers');

router.get('/:product_id', async (request, response) => {
    const productId = request.params.product_id;

    if (checkValidId(response, productId)) {
        try {
            const votes = await wishQuery.getAllVotesByProduct(productId);
            response.json({
                error: false,
                message: `Successfully retrieved all votes to product id#${productId}`,
                payload: votes,
            })
        } catch (err) {
            handleErrors(response, err);
        }
    }
});

router.post('/addVote', async (req, res) => {
    let userId = parseInt(req.body.user_id);
    let productId = parseInt(req.body.product_id);
    try{
        const newVote = await wishQuery.addNewVote(userId, productId);
        res.json({
            error: false,
            message: 'Successfully created a new vote'
        })
    }
    catch (err) {
            handleErrors(res, err);
    }
})

module.exports = router;
