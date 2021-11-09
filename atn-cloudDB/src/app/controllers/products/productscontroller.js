const db = require('../../../config/db')

class productscontroller{
    // [GET] /view/products
    products(req, res, next){
    // Query DB
    db.query("SELECT * FROM product WHERE isdelete = false", (error, results) => { 
        if(error){
            console.log(error)
        }
        res.render('./products/viewproducts', {product: results.rows})
    })
    }

    // [GET] /add/new/products
    Create(req,res,next){
        db.query("SELECT * FROM category ORDER BY cateid ASC", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./products/createproduct', { category: results.rows})
        })
    }

    // [POST] Post value to /view/products
    Postdata(req,res,next){
    const proid = req.body.proid
    const proname = req.body.proname
    const proprice = req.body.proprice
    const proimage = "uploads/" + req.file.filename
    const prospecification = req.body.prospecification
    const prodescription = req.body.prodescription
    const isshow = req.body.isshow
    const cateid = req.body.cateid

    // Insert form values to DB
        db.query("INSERT INTO product (proid, proname, proprice, proimg, prospecification, prodescription, isshow,isdelete, cateid) VALUES ($1, $2, $3, $4, $5, $6, $7, false, $8)",
        [proid, proname, proprice, proimage, prospecification, prodescription, isshow, cateid], 
        (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/view/products')
        })
    }

    // [View] /update/exist/product
    Viewupdate(req, res, next){
        var proid = req.params.id
        console.log(proid)
        // Query DB
        db.query("SELECT * FROM product WHERE proid = $1", [proid], (error, results) => { 
            if(error){
                console.log(error)
            }
            db.query("SELECT * FROM category ORDER BY cateid ASC", (error, results2) => {
                if(error){
                    console.log(error)
                }
                res.render('./products/updateproduct', {product: results.rows, category: results2.rows})
            })
            
        })

        // db.query("SELECT * FROM product INNER JOIN category ON product.cateid = category.cateid WHERE proid = $1", [proid], (error, results) => {
        //     if(error){
        //         console.log(error)
        //     }
        //     res.render('./products/updateproduct', {product: results.rows})
        // })
    }

    // [POST] Post value to /update/product/:id
    Updatedata(req,res,next){
        const upproid = req.body.proid
        const upproname = req.body.proname
        const upproprice = req.body.proprice
        const upproimage = "uploads/" + req.file.filename
        const upprospecification = req.body.prospecification
        const upprodescription = req.body.prodescription
        const upcateid = req.body.cateid
        const upisshow = req.body.isshow
        const proid = req.params.id

        db.query("UPDATE product SET proid = $1, proname = $2, proprice = $3, proimg = $4, prospecification = $5, prodescription = $6, cateid = $7, isshow = $8 WHERE proid = $9",
        [upproid, upproname, upproprice, upproimage, upprospecification, upprodescription, upcateid, upisshow, proid], 
        (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/view/products')
        } 
        )
    }

    // [GET] "/recovery/products"
    recovery(req,res,next){
        db.query("SELECT * FROM product WHERE isdelete = true", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./products/recoveryproduct', { product: results.rows})
        })
    }

    // [DELETE] "/delete/product/:id"
    delete(req,res,next){
        var id = req.params.id
        db.query("UPDATE product SET isdelete = true WHERE proid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/view/products')
        })
    }

    // [GET] "/product/details/:id"
    details(req, res){
        const id = req.params.id
        db.query("SELECT * FROM product WHERE proid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./products/detailsproduct', { product: results.rows})
        })
    }

    // [GET] "/product/order/:id"
    order(req, res){
        const id = req.params.id
        db.query("SELECT * FROM product WHERE proid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./orders/orderproduct', { product: results.rows})
        })
    }
}

module.exports = new productscontroller()