const express = require('express');
const router = express.Router();
const wishlistQueries = require('../queries/wishlist');
// const votesQueries = require('../queries/votes');
const {handleErrors} = require('./helpers/helpers');


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
router.post('/vote/:product_id', async (req, res, next) => {
    let product_id = req.params.product_id
    let user_id = req.body.user_id

    if (product_id && user_id) {
        try {
            let doesWishExist = await wishlistQueries.checkIfWishExists(product_id, user_id); 
            let newWish = null;
            if(!doesWishExist){
                newWish = await wishlistQueries.createWishlistItem(product_id, user_id, true);
            } else {
                newWish = await wishlistQueries.updateWishlistItem(doesWishExist.id, true);
            }
            res.status(200).json({
                message: "Success added new wish and a vote",
                payload: newWish
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

        // if(wishItem.willing_to_buy){
        //     wishItem = await wishlistQueries.addCoupon(wish_id);
        // }
        // else {
        //     const voteExists = await votesQueries.checkIfVoteExists(wishItem.product_id, wishItem.user_id)
        //     if (voteExists) {
        //         await wishlistQueries.deleteVote(voteExists.id);
        //     }
        // }

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