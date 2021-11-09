const db = require('../../../config/db')

class restorecategorycontroller{
    // [PATCH] "/restore/category/:id"
    restore(req, res){
        const id = req.params.id
        db.query("UPDATE category SET isdelete = false WHERE cateid = $1", [id], (error,results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/recovery/deleted/categories')
        })
    }
    // [DELETE] "/forcedelete/category/:id"
    delete(req, res){
        const id = req.params.id
        db.query("DELETE FROM category WHERE cateid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/recovery/deleted/categories')
        })
    }
}
module.exports = new restorecategorycontroller();