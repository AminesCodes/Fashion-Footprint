const express = require('express');
const router = express.Router();
const wishlistQueries = require('../queries/wishlist');

/* GET wishlist endpoint */
router.get('/', function(req, res, next) {
  res.send('wishlist endpoint');
});

/* GET all wishlist by User Id */
router.get('/:user_id', async (req, res, next) => {

    let user_id = req.params.user_id

    try {
        let wishlistByUser = await wishlistQueries.getWishlistByUserId(user_id)
        res.status(200).json({
            message: `Success retrieved all wishes for user ${user_id}`,
            payload: wishlistByUser
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})

/* POST add new wish */
router.post('/add/:product_id', async (req, res, next) => {

    let product_id = req.params.product_id
    let user_id = req.body.user_id
    let style_id = req.body.style_id

    try {
        let newWish = await wishlistQueries.createWishlistItem(product_id, user_id, style_id)
        res.status(200).json({
            message: "Success added new wish",
            payload: newWish
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})

/* PATCH add new wish */
router.patch('/vote/:wish_id', async (req, res, next) => {

    let wish_id = req.params.wish_id

    try {
        let updatedWish = await wishlistQueries.updateWishlistItem(wish_id)
        res.status(200).json({
            message: `Success updated wish with id ${wish_id}`,
            payload: updatedWish
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})

/* DELETE wish */
router.patch('/delete/:wish_id', async (req, res, next) => {

    let wish_id = req.params.wish_id

    try {
        let deletedWish = await wishlistQueries.deleteWishlistItem(wish_id)
        res.status(200).json({
            message: `Success deleted wish with id ${wish_id}`,
            payload: deletedWish
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})



module.exports = router;