const express = require('express');
const router = express.Router();
const productsController = require('../../app/controllers/products/productscontroller')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"||
        file.mimetype === "image/png"){
            cb(null, './src/public/uploads')
        }
        else{
            cb(new Error('No Image'), false)
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

// [GET] route "/view/products"
router.get('/products', productsController.products)
// [POST] route "/create/product"
router.post('/product', upload.single("proimg"), productsController.Postdata)
// [PUT] route "/update/product/:id"
router.put('/product/:id', upload.single("proimg"), productsController.Updatedata)
// [GET] route "/create/product"
router.get('/product', productsController.Create)
// [GET] route "/update/exist/product/:id"
router.get('/exist/product/:id', productsController.Viewupdate)
// [GET] route "/recovery/deleted/products"
router.get('/deleted/products', productsController.recovery)
// [DELETE] route "/delete/product/:id"
router.delete('/product/:id', productsController.delete)
// [GET] route "/product/details/:id"
router.get('/details/:id', productsController.details)
// [GET] route "/product/order/:id"
router.get('/order/:id', productsController.order)

module.exports = router