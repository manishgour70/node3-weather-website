const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//setup handle bars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Manish Gour'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Manish Gour'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help:'How I can help you',
        name:'Manish Gour'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({ error:'you must provide the address' })
    }

    geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
        res.send({
            forecast: forecastData,
            location,
            address:req.query.address

        })

    })
 })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Manish',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Manish',
        errorMessage:'Page not found'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send([{name:'manish'},{name:'Gour'}])
// })

// app.get('/weather',(req,res)=>{
//     res.send('<h1>weather is cool</h1>')
// })
app.listen(port,()=>{
    console.log('server is running at port '+port)
})