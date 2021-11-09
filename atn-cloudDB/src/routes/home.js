const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homecontroller')

// get route "/"
router.get('/', homeController.Index)
module.exports = router