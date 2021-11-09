const db = require("../../config/db")

class homecontroller{
    // [GET] Index
    Index(req,res,next){
        db.query("SELECT * FROM product WHERE isshow = true", (error, results) => {
            if(error){
                console.log(error)
            }
            res.render('home', { product: results.rows})
        })
    }
}
module.exports = new homecontroller()