const fetch = require('node-fetch')
// const http = require('http')
// const getloc = require('./getGeo')
const urlfetch = require('./latitudePromise')

// const server = http.createServer((req,res)=>{
//     res.write()
// });



// getting lat and long from address



const forecast = (address)=>{
    return urlfetch(address).then(
        d=>{
            // console.log(url)
            if(!d.error){
                return fetch(d.url)
                    .then(res => res.json())
                    .catch('respnse error')
                    .then(json =>{
                        return {
                            desc:json.current.weather[0].description,
                            temp:(json.current.temp-273).toFixed(2),
                            location:d.place
                        }
                    })
                    .catch(error=>Promise.reject('Unable to connect to wether'))
            }
            else{
                return d
            }    
        })
        .then(data =>Promise.resolve(data))
}
// console.log(forecast('alaska').then(d=>console.log(d)))
module.exports = forecast


// .then(data => {
//     console.log(data)
//     Promise.resolve(data)})