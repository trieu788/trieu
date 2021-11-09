const db = require('../../../config/db')

class orderscontroller{
    view(req, res){
        const orderid = req.body.orderid
        db.query("SELECT * FROM orderproduct ORDER BY orderid ASC", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./orders/vieworder', { orderproduct: results.rows})
        })
    }
    order(req,res){
        const firstname = req.body.cusnamefirst
        const lastname = req.body.cusnamelast
        const fullname = firstname + " " +lastname
        const email = req.body.email
        const phone = req.body.phone
        const country = req.body.country
        const address = req.body.address
        const productID = req.body.proid
        const paymentMethod = req.body.pmethod
        const customerID = req.body.cusid
        const paymentTotal = req.body.proprice
        const paymentID = String(new Date().getTime())
        const orderID = String(new Date().getTime()) + Math.random().toString().substr(2, 5)
        const orderDate = new Date()
        const paymentDate = new Date()
        const status = "success"

        db.query("SELECT * FROM customer WHERE cusid = $1", [customerID], (errorUser, resultsUser) => {
            if(errorUser){
                console.log(errorUser)
                res.end('Order Failed')
            }
            db.query("INSERT INTO orderproduct (orderid, orderdate, status) VALUES ($1, $2, $3)", [orderID, orderDate, status], (errorOrder, resultsOrder) => {
                if(errorOrder){
                    console.log(errorOrder)
                }
                db.query("INSERT INTO payment (pid, pdate, pmethod, total) VALUES ($1, $2, $3, $4)", [paymentID, paymentDate, paymentMethod, paymentTotal], (errorPayment, resultsPayment) => {
                    if(errorPayment){
                        console.log(errorPayment)
                    }
                    db.query("INSERT INTO customer (cusid, cusname, address, email, phone, country) VALUES ($1, $2, $3, $4, $5, $6)", [customerID, fullname, address, email, phone, country], (errorCustomer, resultsCustomer) => {
                        if(errorCustomer){
                            console.log(errorCustomer)
                        }
                        db.query("INSERT INTO orderdetails (orderid, proid, cusid, pid , quantity) VALUES ($1, $2, $3, $4, 1)", [orderID, productID, customerID,paymentID], (errorOrderDetails, resultsOrderDetails) => {
                            if(errorOrderDetails){
                                console.log(errorOrderDetails)
                            }
                            res.redirect('/view/orders')
                        })
                    })
                })
            })
        })
    }

    // [GET] "view/orders/:id"
    details(req, res){
        var orderid = req.params.id
        
        // Order Details Table
        db.query("SELECT * FROM orderdetails WHERE orderid = $1", [orderid], (error, results) => {
            if(error){
                console.log(error)
            }
            var Row = {orderdetails: results.rows}
            var obj = JSON.stringify(Row)
            var parsejson = JSON.parse(obj)
            var customerid = parsejson.orderdetails[0].cusid
            var productID = parsejson.orderdetails[0].proid
            var paymentID = parsejson.orderdetails[0].pid
                // Customer Table
                db.query("SELECT * FROM customer WHERE cusid = $1", [customerid], (errorCustomer, resultsCustomer) => {
                    if(errorCustomer){
                        console.log(errorCustomer)
                    }

                    // Product Table
                    db.query("SELECT * FROM product WHERE proid = $1", [productID], (errorProduct, resultsProduct) => {
                        if(errorProduct){
                            console.log(errorProduct)
                        }

                        // Payment Table
                        db.query("SELECT * FROM payment WHERE pid = $1", [paymentID], (errorPayment, resultsPayment) =>{
                            if(errorPayment){
                                console.log(errorPayment)
                            }
                            res.render('./orders/vieworderdetails', { orderdetails: results.rows, customer: resultsCustomer.rows, product: resultsProduct.rows, payment: resultsPayment.rows})
                        })
                    })
                })
        })  
    }

    invoice(req, res){
        var orderid = req.params.id
        db.query("SELECT * FROM orderdetails WHERE orderid = $1", [orderid], (errorOrderDetails, resultsOrderDetails) => {
            if(errorOrderDetails){
                console.log(errorOrderDetails)
            }
            var Row = {orderdetails: resultsOrderDetails.rows}
            var obj = JSON.stringify(Row)
            var parsejson = JSON.parse(obj)
            var customerid = parsejson.orderdetails[0].cusid
            var productID = parsejson.orderdetails[0].proid
            var paymentID = parsejson.orderdetails[0].pid
            db.query("SELECT * FROM customer WHERE cusid = $1", [customerid], (errorCustomer, resultsCustomer) => {
                if(errorCustomer){
                    console.log(errorCustomer)
                }
                db.query("SELECT * FROM product WHERE proid = $1", [productID], (errorProduct, resultsProduct) => {
                    if(errorProduct){
                        console.log(errorProduct)
                    }
                    db.query("SELECT * FROM payment WHERE pid = $1", [paymentID], (errorPayment, resultsPayment) => {
                        if(errorPayment){
                            console.log(errorPayment)
                        }
                        db.query("SELECT * FROM orderproduct WHERE orderid = $1", [orderid], (errorOrder, resultsOrder) => {
                            if(errorOrder){
                                console.log(errorOrder)
                            }
                            res.render('./orders/orderinvoice', {customer: resultsCustomer.rows, product: resultsProduct.rows, payment: resultsPayment.rows, orderproduct: resultsOrder.rows, orderdetails: resultsOrderDetails.rows})
                        })
                    })
                })
            })
        })
    }
}
module.exports = new orderscontroller()