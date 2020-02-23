const express = require('express');
const router = express.Router();
const materialsQueries = require('../queries/materials');

/* GET materials endpoint */
router.get('/', function (req, res, next) {
    res.send('materials endpoint');
});

/* GET all materials */
router.get('/all', async (req, res, next) => {

    try {
        let allMaterials = await materialsQueries.getAllMaterials()
        res.status(200).json({
            message: "Success retrieved all materials from textiles table",
            payload: allMaterials
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})

/* GET materials by Id */
router.get('/:id', async (req, res, next) => {

    let id = req.params.id

    try {
        let materialById = await materialsQueries.getMaterialById(id)
        res.status(200).json({
            message: `Success retrieved material from textiles table with id ${id}`,
            payload: materialById
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})

/* GET materials by Id */
router.get('/:name', async (req, res, next) => {

    let name = req.params.name

    try {
        let materialByName = await materialsQueries.getMaterialByName(name)
        res.status(200).json({
            message: `Success retrieved material from textiles table with name "${name}"`,
            payload: materialByName
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Failure"
        })
    }
})



module.exports = router;