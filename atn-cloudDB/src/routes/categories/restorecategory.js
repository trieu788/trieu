const express = require('express')
const router = express.Router()
const restorecateController = require('../../app/controllers/categories/restorecategorycontroller')

// Route "/restore/category/:id"
router.patch('/category/:id', restorecateController.restore)
// ROute "/forcedelete/category/:id"
router.delete('/category/:id', restorecateController.delete)

module.exports = router