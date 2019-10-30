const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require ('./utils/geoCode.js')
const forecast = require ('./utils/forecast.js')


const app = express()

//Define path for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather !!',
        name : 'Chintan mepani'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me !!',
        name : 'Chintan mepani'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help Page',
        name: 'Chintan Mepani',
        helpText : 'This is the help page'
    })
})


app.get ('/weather',(req,res)=>{
    
    if(!req.query.address ) {
        return res.send({
            error: 'You must enter address !!'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {

        if(error) {
            return res.send({
                error: error
            })
            
        }
    
        // console.log('Error - ' ,error)
        // console.log('Location - ', location)
    
        forecast(latitude,longitude,(error,data)=> {
            if(error) {
                // console.log('Error - ' ,error)
                res.send({
                    error: error
                })
            }else {
                // console.log('Data - ', data)
                res.send({
                    location : location,
                    temprature :data

                })
            }
                         
        })
    }
    )
        
    // res.send({forecast : 'It is raining',
    //         location: 'Mumbai'})

})

app.get ('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Chintan Mepani',
        errorMsg: 'help article not found!!'
    })
})


app.get ('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Chintan Mepani',
        errorMsg: 'Page Not found !!'
    })
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000 !!')
})