const express = require('express');
const router = express.Router();
const materialsQueries = require('../queries/materials');
const { handleErrors } = require('./helpers/helpers');

/* GET all materials */
router.get('/all', async (req, res, next) => {

    try {
        let allMaterials = await materialsQueries.getAllMaterials()
        res.status(200).json({
            message: "Success retrieved all materials from textiles table",
            payload: allMaterials
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* GET materials by Id or by Name */
router.get('/:idOrName', async (req, res, next) => {

    let idOrName = Number(req.params.idOrName)

        try {
            
        if (isNaN(idOrName)) {

            let materialByName = await materialsQueries.getMaterialByName(idOrName)
            res.status(200).json({
                message: `Success retrieved material from textiles table with name "${idOrName}"`,
                payload: materialByName
            })

        } else {

            let materialById = await materialsQueries.getMaterialById(idOrName)
            res.status(200).json({
                message: `Success retrieved material from textiles table with id ${idOrName}`,
                payload: materialById
            })

        } 
        } catch (err) {
            handleErrors(res, err)
        }
    
})


module.exports = router;