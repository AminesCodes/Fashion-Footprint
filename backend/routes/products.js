const express = require('express');
const router = express.Router();
const productQueries = require('../queries/products');
const { handleErrors } = require('./helpers/helpers');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './public/products')
    },
    filename: (request, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename)
    }

})

const fileFilter = (request, file, cb) => {
    if (file.mimetype.slice(0, 6) === 'image/') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage, fileFilter
})

/* GET all product by Brand Id */
router.get('/:brand_id/all', async (req, res, next) => {

    let brand_id = req.params.brand_id

    try {
        let productByBrand = await productQueries.getProductsByBrand(brand_id)
        res.status(200).json({
            message: `Success retrieved all products for brand with id #${brand_id}`,
            payload: productByBrand
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* GET all product by type Id */
router.get('/type/:type_id', async (req, res) => {
    let type_id = req.params.type_id

    try {
        let productByType = await productQueries.getProductByType(type_id)
        res.status(200).json({
            message: `Success, retrieved all products by type with id #${type_id}`,
            payload: productByType
        })

    } catch (err) {
        handleErrors(res, err)
    }
})

/* GET all product by textile Id */
router.get('/material/:textile_id', async (req, res) => {
    let material_id = req.params.textile_id

    try {
        let productByMaterial = await productQueries.getProductByMaterial(material_id)
        res.status(200).json({
            message: `Success, retrieved all products by material with id #${material_id}`,
            payload: productByMaterial
        })

    } catch (error) {
        handleErrors(res, error)
    }
})


/* POST new product*/
router.post('/add/:brand_id', upload.single('product_pic'), async (req, res) => {

    let brand_id = req.params.brand_id
    let type_id = req.body.type_id
    let name = req.body.name
    let default_pic = req.body.default_pic
    let description = req.body.description
    let closing_date = req.body.closing_date


    if (type_id, name, default_pic, description, closing_date, brand_id) {

        try {
            let newProduct = await productQueries.createProduct(type_id, name, default_pic, description, closing_date, brand_id)
            res.status(200).json({
                message: "Success added new product",
                payload: newProduct
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


/* PUT single product (updates everything) */
router.put('/:product_id', upload.single('product_pic'), async (req, res, next) => {

    let product_id = req.params.product_id
    let type_id = req.body.type_id
    let name = req.body.name
    let default_pic = req.body.default_pic
    let description = req.body.description
    let closing_date = req.body.closing_date


    try {
        let updatedProduct = await productQueries.updateProductInfoById(product_id, type_id, name, default_pic, description, closing_date)
        res.status(200).json({
            message: `Success updated product with id ${product_id}`,
            payload: updatedProduct
        })

    } catch (err) {
        handleErrors(res, err)
    }
})