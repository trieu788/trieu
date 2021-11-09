const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const Route = require('./routes/index')
const methodOverride = require('method-override')

// override with POST having ?_method=PUT, DELETE, PATCH
app.use(methodOverride('_method'))

// Static File "Image, CSS"
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
})
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources' , 'views'))

//Using middleware for req.body
app.use(express.urlencoded())
app.use(express.json())

// Route
Route(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Start Successfully')
})