const express = require('express')
const router = express.Router()
const ordersController = require('../../app/controllers/orders/orderscontroller')

// [GET] route "/view/orders"
router.get('/orders', ordersController.view)
// [GET] route "/view/orders/:id"
router.get('/orders/:id', ordersController.details)

// [POST] route "/view/orders" for order product
router.post('/orders', ordersController.order)

// [GET] view/invoice/order/:id
router.get('/invoice/order/:id' ,ordersController.invoice)

module.exports = router