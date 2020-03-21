const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');


const productQueries = require('../queries/products');
const voteQueries = require('../queries/votes');
const { handleErrors, checkValidId, checkValidParams } = require('./helpers/helpers');

// LOCAL STORAGE SETUP
// const storage = multer.diskStorage({
//     destination: (request, file, cb) => {
//         cb(null, './public/images/products')
//     },
//     filename: (request, file, cb) => {
//         const filename = Date.now() + '-' + file.originalname
//         cb(null, filename)
//     }
// })

// AWS S3 Storage Setup
const s3 = new AWS.S3({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-east-2',
})

const storage = multerS3({
      s3: s3,
      bucket: 'fashion-footprint',
      acl: 'public-read',
      metadata: function (request, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (request, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname)
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
    storage, 
    fileFilter,
    limits: { fileSize: 3000000 }, // In bytes: 3000000 bytes = 3 MB
})

const deleteFile = (fileLink) => {
    const fileName = fileLink.slice(53); // https://fashion-footprint.s3.us-east-2.amazonaws.com/ BASE LINK LENGTH IS 53
    const bucketInstance = new AWS.S3();
    const params = {
        Bucket: 'fashion-footprint',
        Key: fileName
    };
    bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });
}

const generateCoupon = () => {
    const str = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm';
    const coupon = '';
    for (const i=0; i<7; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        coupon += str[randomIndex];
    }
    return coupon;
}

/* GET all product by Brand Id */
router.get('/:brand_id/all', async (request, response, next) => {

    const brand_id = request.params.brand_id

    try {
        const productByBrand = await productQueries.getProductsByBrand(brand_id)
        response.status(200).json({
            message: `Success retrieved all products for brand with id #${brand_id}`,
            payload: productByBrand
        })

    } catch (err) {
        handleErrors(response, err)
    }
})

/* GET all product by type Id */
// router.get('/fitler/:brand_id/:material_id/:type_id', async (request, response) => {
//     const {brand_id, material_id, type_id} = request.params

//     try {
//         const productByType = await productQueries.getProductByFilter(Number(brand_id), Number(material_id), Number(type_id))
//         response.status(200).json({
//             message: `Success, retrieved all products with filter id #${'brand_id ' + brand_id} ${'material_id ' + material_id} ${'type_id ' + type_id}`,
//             payload: productByType
//         })

//     } catch (err) {
//         handleErrors(response, err)
//     }
// })

/* GET all product by type Id */
router.get('/type/:type_id', async (request, response) => {
    const type_id = request.params.type_id

    try {
        const productByType = await productQueries.getProductByType(type_id)
        response.status(200).json({
            message: `Success, retrieved all products by type with id #${type_id}`,
            payload: productByType
        })

    } catch (err) {
        handleErrors(response, err)
    }
})

/* GET all product by textile Id */
router.get('/material/:textile_id', async (request, response) => {
    const material_id = request.params.textile_id

    try {
        const productByMaterial = await productQueries.getProductByMaterial(material_id)
        response.status(200).json({
            message: `Success, retrieved all products by material with id #${material_id}`,
            payload: productByMaterial
        })

    } catch (error) {
        handleErrors(response, error)
    }
})

/* GET all product by filters */
router.get('/filters/:brandId/:typeId/:textileId', async (request, response) => {
    const brandId = request.params.brandId;
    const typeId = request.params.typeId;
    const textileId = request.params.textileId;

    if (checkValidId(response, brandId) && checkValidId(response, typeId) && checkValidId(response, textileId)) {
        try {
            const products = await productQueries.getFilteredProducts(brandId, typeId, textileId);
            response.status(200).json({
                error: false,
                message: `Success, retrieved all products with filters`,
                payload: products
            })
    
        } catch (error) {
            handleErrors(response, error)
        }
    }
})

/* POST new product*/
router.post('/add/:brand_id', upload.single('productPic'), async (request, response) => {
    const brand_id = request.params.brand_id;
    const type_id = request.body.type_id;
    const name = request.body.name;
    const description = request.body.description;
    const closing_date = request.body.closing_date;
    const material_id = request.body.material_id;
    let default_pic = null;

    if (request.file) {
        // default_pic = 'http://' + request.headers.host + '/images/products/' + request.file.filename;
        // default_pic = '/images/products/' + request.file.filename;
        default_pic = request.file.location;
    } 
    console.log('BODY: ', request.body)
    console.log('FILE: ', request.file)
    if (checkValidId(response, brand_id) 
        && checkValidId(response, type_id)
        && checkValidParams(response, name)
        && checkValidParams(response, description)
        && checkValidParams(response, closing_date)
        && checkValidId(response, material_id)
        && checkValidParams(response, default_pic)
        ) {
        try {
            const newProduct = await productQueries.createProduct(brand_id, type_id, name, default_pic, description, closing_date, material_id)
            response.status(200).json({
                message: "Success added new product",
                payload: newProduct
            })
        } catch (err) {
            handleErrors(response, err)
        }
    } else {
        if (request.file) {
            deleteFile(request.file.location);
        }
        response.status(403).json({
            message: "Missing product picture OR an error occurred when uploading it"
        })
    }

})


/* PUT single product (updates everything) */
router.put('/:product_id', upload.single('productPic'), async (request, response) => {
    const product_id = request.params.product_id
    const type_id = request.body.type_id
    const name = request.body.name
    const description = request.body.description
    const closing_date = request.body.closing_date
    const material_id = request.body.material_id
    let default_pic = request.body.default_pic

    if (request.file) {
        // default_pic = 'http://' + request.headers.host + '/images/products/' + request.file.filename;
        // default_pic = '/images/products/' + request.file.filename;
        default_pic = request.file.location;
    }

    try {
        const updatedProduct = await productQueries.updateProductInfoById(product_id, type_id, name, default_pic, description, closing_date, material_id)
        if (request.file) {
            deleteFile(request.body.default_pic);
        }
        response.status(200).json({
            message: `Success updated product with id ${product_id}`,
            payload: updatedProduct
        })

    } catch (err) {
        if (request.file) {
            deleteFile(request.file.location);
        }
        handleErrors(response, err);
    }
})

router.patch('/:productId', async (request, response) => {
    const productId = request.params.productId
    if (checkValidId(response, productId)) {
        try {
            const updatedProduct = await productQueries.updateProductStatus(productId);
            if (updatedProduct.going_to_production) {
                const allVotesForProduct = await voteQueries.getAllVotesByProduct(updatedProduct.id);
                const promises = [];
                allVotesForProduct.forEach(vote => promises.push(voteQueries.addCoupon(vote.id, generateCoupon())))
                await Promise.all(promises)
            } 
            else {
                const allVotesForProduct = await voteQueries.getAllVotesByProduct(updatedProduct.id);
                const promises = [];
                allVotesForProduct.forEach(vote => promises.push(voteQueries.deleteCoupon(vote.id)))
                await Promise.all(promises)
            }

            response.status(200).json({
                message: `Success updated product with id ${productId}`,
                payload: updatedProduct
            })
    
        } catch (err) {
            handleErrors(response, err)
        }
    }
})

router.delete('/:productId', async (request, response) => {
    const productId = request.params.productId
    if (checkValidId(response, productId)) {
        try {
            const deletedProduct = await productQueries.deleteProduct(productId);
            deleteFile(deletedProduct.default_pic);
            response.status(200).json({
                message: `Success deleted product with id ${productId}`,
                payload: deletedProduct
            });
    
        } catch (err) {
            handleErrors(response, err);
        }
    }
})

module.exports = router;
