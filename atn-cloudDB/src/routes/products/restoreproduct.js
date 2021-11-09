const express = require('express');
const router = express.Router();
const resproductcontroller = require('../../app/controllers/products/restoreproductcontroller')

// [PATCH] "/restore/product/:id"
router.patch('/product/:id', resproductcontroller.restore)
// [DELETE] "/forcedelete/product/:id"
router.delete('/product/:id', resproductcontroller.forcedelete)

module.exports = router