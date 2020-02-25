const express = require('express');
const router = express.Router();
const stylesQueries = require('../queries/styles');
const {handleErrors} = require('./helpers/helpers');


/* GET style by Id or Name */
router.get('/:idOrName', async (req, res, next) => {

    let idOrName = Number(req.params.idOrName)

        try {
            
        if (isNaN(idOrName)) {

            let styleByName = await stylesQueries.getStyleByName(idOrName)
            res.status(200).json({
                message: `Success retrieved style from styles table with name "${idOrName}"`,
                payload: styleByName
            })

        } else {

            let stylesById = await materialsQueries.getMaterialById(idOrName)
            res.status(200).json({
                message: `Success retrieved style from styles table with id ${idOrName}`,
                payload: stylesById
            })

        } 
        } catch (err) {
            handleErrors(res, err)
        }
    
})

/* POST add new style */
router.post('/add', async (req, res, next) => {

    let name = req.body.name
    let pic = req.body.pic

    if (name && pic) {

    try {
        let newStyle = await stylesQueries.addStyle(name, pic)
        res.status(200).json({
            message: "Success added new style",
            payload: newStyle
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

/* PATCH update style by id  */
router.patch('/update/:style_id', async (req, res, next) => {

    let style_id = req.params.style_id
    let name = req.body.name
    let pic = req.body.pic 

    try {
        let updatedStyle = await stylesQueries.updateStyle(style_id, name, pic)
        res.status(200).json({
            message: `Success updated style with id ${style_id}`,
            payload: updatedStyle
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* DELETE style */
router.delete('/:style_id', async (req, res, next) => {

    let style_id = req.params.style_id

    try {
        let deletedStyle = await stylesQueries.deleteStyle(style_id)
        res.status(200).json({
            message: `Success deleted style with id ${style_id}`,
            payload: deletedStyle
        })

    } catch (err) {
        handleErrors(res, err)
    }
})