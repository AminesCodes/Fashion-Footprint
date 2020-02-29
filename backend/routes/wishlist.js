const express = require('express');
const router = express.Router();
const wishlistQueries = require('../queries/wishlist');
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
router.post('/add/:product_id', async (req, res, next) => {

    let product_id = req.params.product_id
    let user_id = req.body.user_id
    console.log(product_id, user_id)

    if (product_id && user_id) {
        try {
            let doesWishExist = await wishlistQueries.checkIfWishExists(product_id, user_id);
            console.log(doesWishExist);
            if(!doesWishExist){
                let newWish = await wishlistQueries.createWishlistItem(product_id, user_id)
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

/* PATCH add vote  */
router.patch('/vote/:wish_id', async (req, res, next) => {

    let wish_id = parseInt(req.params.wish_id);
    console.log(typeof wish_id);

    try {
        let updatedWish = await wishlistQueries.updateWishlistItem(wish_id);
        console.log('Updated Vote: ', updatedWish);
        if(updatedWish.willing_to_buy){
            updatedVote = await wishlistQueries.createVote(wish_id);
            console.log('After Update: ', updatedVote);
        }
        else {
            console.log('ELSE')
            updatedVote = await wishlistQueries.deleteVote(wish_id);
        }
        res.status(200).json({
            message: `Success updated wish with id ${wish_id}`,
            payload: updatedWish
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* DELETE wish */
router.delete('/:wish_id', async (req, res, next) => {

    let wish_id = req.params.wish_id;
    console.log(wish_id);

    try {
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