const express = require('express');
const router = express.Router();
const wishlistQueries = require('../queries/wishlist');
// const votesQueries = require('../queries/votes');
const {handleErrors, checkValidId} = require('./helpers/helpers');

/* GET all votes by product ID  */
router.get('/votes/:product_id', async (request, response) => {
    const productId = request.params.product_id;

    if (checkValidId(response, productId)) {
        try {
            const votes = await wishlistQueries.getAllVotesByProduct(productId);
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


/* GET all wishlist by User Id including the users and products  */
router.get('/:user_id', async (req, res, next) => {

    let user_id = req.params.user_id

    try {
        let wishlistByUser = await wishlistQueries.getWishlistByUserId(user_id)
        res.status(200).json({
            message: `Success retrieved all wishes for user ${user_id}`,
            payload: wishlistByUser
        })

    } catch (err) {
        handleErrors(res, err)
    }
})


/* POST add new wish */
router.post('/:product_id', async (req, res, next) => {
    let product_id = req.params.product_id
    let user_id = req.body.user_id

    if (product_id && user_id) {
        try {
            let doesWishExist = await wishlistQueries.checkIfWishExists(product_id, user_id);
            if(!doesWishExist){
                let newWish = await wishlistQueries.createWishlistItem(product_id, user_id, false)
                res.status(200).json({
                    message: "Success added new wish",
                    payload: newWish
                }) 
            } else {
                res.status(204).end()
            }
        } catch (err) {
            handleErrors(res, err)
        }

    } else {
        res.status(403).json({
            message: "Missing information"
        })
    }
})

// POST add new vote (from the home page that will create a wish as well) 
router.post('/vote/add_vote', async (req, res, next) => {
    let product_id = req.body.product_id
    // let user_id = req.body.user_id
    let user_id = req.user.id

    if (product_id && user_id) {
        try {
            let doesWishExist = await wishlistQueries.checkIfWishExists(product_id, user_id); 
            let wishItem = null;
            if(!doesWishExist){
                wishItem = await wishlistQueries.createWishlistItem(product_id, user_id, true);
            } else {
                wishItem = await wishlistQueries.updateWishlistItem(doesWishExist.id, true);
            }
            res.status(200).json({
                message: "Success added new wish and a vote",
                payload: wishItem
            }) 
        } catch (err) {
            handleErrors(res, err)
        }

    } else {
        res.status(403).json({
            message: "Missing information"
        })
    }
})

/* PATCH add vote  */
router.patch('/vote/:wish_id', async (req, res, next) => {
    try {
        let wish_id = parseInt(req.params.wish_id);
        const vote = req.body.vote || false;
        let wishItem = await wishlistQueries.updateWishlistItem(wish_id, vote);

        res.status(200).json({
            message: `Success updated wish with id ${wish_id}`,
            payload: wishItem
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* DELETE wish */
router.delete('/:wish_id', async (req, res, next) => { 
    try {
        let wish_id = req.params.wish_id;

        let deletedWish = await wishlistQueries.deleteWishlistItem(wish_id)
        res.status(200).json({
            message: `Success deleted wish with id ${wish_id}`,
            payload: deletedWish
        })

    } catch (err) {
        handleErrors(res, err)
    }
})



module.exports = router;