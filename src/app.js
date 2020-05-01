const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather',
        name: 'Haitham'

    })
})


app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About Me',
        name: 'Haitham'

    })


})

app.get('/help', (req, res) => {

    res.render('help', {

        title: 'Help',
        helpText: 'For help contact me',
        name: 'Haitham'
    })

})


app.get('/weather', (req, res) => {


    if (!req.query.address) {

        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
            
        })
    })
   
})






app.get('/help/*', (req, res) => {

    res.render('404', {

        title: '404',
        name: 'Haitham',
        errorMessage: 'Help article not found'
        
    })

})


app.get('*',(req, res)=> {

    res.render('404', {

        title: 'Error',
        name: 'Haitham',
        errorMessage: 'Page not found'


    })
})




app.listen(3000, () => {

    console.log('Server is up on port 3000. ')

})