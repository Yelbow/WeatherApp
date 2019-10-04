const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // initialize the express aplication
const port = process.env.PORT || 3000

// paths for express config
const staticPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')

// setup view engine (handle bars plugin)
app.set('view engine', 'hbs') // set express application up  to use hbs view engine
app.set('views', viewPath) // tells express/hbs to look for a dir called "templates" for the dynamic page files // be default this is views
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath)) // tells the app to find the static pages in public dir

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me', 
        name: 'Jelle',
    })
})

app.get('/weather', ({ query }, res) => {
    if (!query.address){
       return res.send({error:'you must provide an address'})
    }

    geocode(query.address, (e, coordinates, location) => {
    if (e) { return res.send({error: e}) }

        forecast(coordinates, (e, temperature, desc) => {
            if (e) { return res.send({error: e}) }

            res.send({
                location,
                temperature,
                desc,
            })
        })
    }) 
})

app.get('/products', ({ query }, res) => {

    if (!query.search){
        res.send('you must provide a search term')
    } else {
        console.log(query)
        res.send({
            products: []
        })
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'need help?',
        msg: 'for help dial 1800-need-help-urgently-my-wife-is-dying'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'you actually tried that',
        errorMsg: 'we are sorry but this help article does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'we are sorry but this page does not exist'
    })
})

//

//

// app.get('/weather', (req, res) => {
//     res.send('on weather page')
// })

app.listen(port, () => {
    console.log('server is up on port' + port)
})