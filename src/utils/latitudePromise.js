const fetch = require('node-fetch')




const urlfetch = (place)=> {
        var murl ='https://api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1Ijoic2hhc2hpa2FudGg4NjM5IiwiYSI6ImNrOTlzdTNsbTAxZGEzbnAzaGM0MW9xbzIifQ.aVKUtEf3GOxy-5JSPKqQYg&limit=1'
        murl=murl.replace('paris',place)
        return fetch(murl)
            .then(res=>res.json())
            .then(json=>{
                var url='https://api.openweathermap.org/data/2.5/onecall?lat=34.05&lon=-118.24&appid=6f9b197c5557fa6b935e875dfc4cee04'
                if(!json.message && !json.features.length==0){
                    const lat = (json.features[0].center[1]).toFixed(2)
                    const long = (json.features[0].center[0]).toFixed(2)
                    url=url.replace('34.05',''+lat)
                    url=url.replace('-118.24',''+long)
                    return {
                        url,
                        place:json.features[0].place_name
                    }
                }
                else{
                    return {
                        error:'Unable to find locaion. Try another search'
                    }
                }
            })
            .then(url=>Promise.resolve(url))
}

// console.log(urlfetch('###').then(url=>console.log(url)))
module.exports=urlfetch