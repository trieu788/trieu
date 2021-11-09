const db = require('../../../config/db')

class restoreproductcontroller{
    // [PATCH] "restore/product/:id"
    restore(req,res,next){
        var id = req.params.id
        db.query("UPDATE product SET isdelete = false WHERE proid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/recovery/deleted/products')
        })
    }

    // [DELETE] "forcedelete/product/:id"
    forcedelete(req,res,next){
        var id = req.params.id
        db.query("DELETE FROM product WHERE proid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/recovery/deleted/products')
        })
    }
}

module.exports = new restoreproductcontroller()