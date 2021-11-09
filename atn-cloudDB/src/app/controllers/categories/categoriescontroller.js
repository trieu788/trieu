const db = require('../../../config/db')

class categoriesController{
    // [GET] "/view/categories"
    view(req, res, next){
        db.query("SELECT * FROM category WHERE isdelete = false", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./categories/viewcategory', {category: results.rows})
        })
    }

    // [GET] "/create/category"
    create(req, res){
        res.render('./categories/createcategory')
    }

    // [POST] "/create/category"
    postcreate(req, res){
        const cateid = req.body.cateid
        const catename = req.body.catename
        const cateimg = "uploads/" + req.file.filename
        const cateisshow = req.body.isshow

        db.query("INSERT INTO category (cateid, catename, cateimg, isshow, isdelete) VALUES ($1, $2, $3, $4, false)", 
        [cateid, catename, cateimg, cateisshow], 
        (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/view/categories')
        })
    }

    // [GET] "/update/category/:id"
    update(req,res){
        const id = req.params.id

        db.query("SELECT * FROM category WHERE cateid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./categories/updatecategory', { category: results.rows})
        })
    }
    // [PUP] "/update/category/:id"
    putupdate(req,res){
        const upcateid = req.body.cateid
        const upcatename = req.body.catename
        const upcateimage = "uploads/" + req.file.filename
        const img = req.body.cateimg
        const id = req.params.id
        db.query("UPDATE category SET cateid = $1, catename = $2, cateimg = $3 WHERE cateid = $4", [upcateid, upcatename, upcateimage, id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(upcateimage, img)
            res.redirect('/view/categories')
        })
    }

    // [DELETE] "/delete/category/:id"
    delete(req,res){
        const id = req.params.id
        db.query("UPDATE category SET isdelete = true WHERE cateid = $1", [id], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log(results)
            res.redirect('/view/categories')
        })
    }
    // [GET] "/recovery/deleted/categories"
    viewrecovery(req, res){
        db.query("SELECT * FROM category WHERE isdelete = true", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('./categories/recoverycategory', {category: results.rows})
        })
    }

}
module.exports = new categoriesController()