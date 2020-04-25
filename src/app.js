const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/httpcalls')

const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname,'../res/index.html'))

const htpath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(htpath)

//setting up handle bars
//It should be in default src/views location but we can change it
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setting up static contents location
app.use(express.static(htpath)) //Instead of '' route

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shashikanth'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Shashikanth'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText:'Im gonna help you',
        title:'Help',
        name:'Shashikanth'
    })
})
// app.get('', (req,res) => {
//     res.send('hello world, im express')
// })

// app.get('/help', (req,res) => {
//     // res.send('hey, never ever loose hope')
//     res.send({
//         name:'shashi',
//         message:'hello'
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<h2>EXPRESS...<h2>')
// })

app.get('/weather', (req,res) => {
    // let re=/^[a-zA-Z0-9]*$/
    // console.log(req.query.address.match(re))
    // if(!req.query.address || req.query.address.match(re)==null ){
    //     return res.send({
    //         error:'Unable to find locaion. Try another search'
    //     })
    // }
    forecast(req.query.address)
        .then(data=>{
            if(!data.error){
                res.send({
                    forecast:data.desc,
                    temperature:data.temp,
                    location:data.location,
                    address:req.query.address
                })
            }
            else{
                res.send(data)
            }
        })
    // console.log(req.query.address)
    // res.send({
    //     location:'Paris',
    //     forecast:'snow',
    //     address:forecast(req.query.address)
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('error', {
        title:'ERROR: 404',
        msg:'Help article',
        name:'Shashikanth'
    })
})

app.get('*',(req,res)=>{
    res.render('error', {
        title:'ERROR: 404',
        msg:'Page',
        name:'Shashikanth'
    })
})

app.listen(3000, () => {
    console.log("server started")
})