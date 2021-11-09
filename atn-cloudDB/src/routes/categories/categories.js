const express = require('express')
const router = express.Router()
const categoriesController = require('../../app/controllers/categories/categoriescontroller')
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


// Route "/view/categories"
router.get('/categories', categoriesController.view)
// ROute "/update/category/:id"
router.get('/category/:id', categoriesController.update)
router.put('/category/:id', upload.single("cateimg"), categoriesController.putupdate)
//Route "/delete/category/:id"
router.delete('/category/:id', categoriesController.delete)
//Route "/recovery/deleted/categories"
router.get('/deleted/categories',categoriesController.viewrecovery)
//Route "/create/category"
router.get('/category', categoriesController.create)
router.post('/category', upload.single("cateimg"), categoriesController.postcreate)
module.exports = router