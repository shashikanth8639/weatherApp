
// fetch('http://puzzle.mead.io/puzzle')
//     .then(res=>res.json())
//     .then(json=>console.log(json))



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')

weatherForm.addEventListener('submit', (data)=>{
    data.preventDefault()
    const location = search.value
    console.log(location)
    msg1.textContent='Loading...'
    msg2.textContent=''
    // fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/alaska.json?access_token=pk.eyJ1Ijoic2hhc2hpa2FudGg4NjM5IiwiYSI6ImNrOTlzdTNsbTAxZGEzbnAzaGM0MW9xbzIifQ.aVKUtEf3GOxy-5JSPKqQYg')
    fetch('http://localhost:3000/weather?address='+location)
    .then(res=>res.json())
    .then(json=>{
        if(Object.keys(json).length==1){
            // console.log(json.error)
            msg1.innerHTML=''
            msg2.innerHTML=json.error
        }
        else{
            msg1.innerHTML="It's "+json.forecast+ ' here with temperature '+json.temperature+"°C at "+json.location //ALT+0176
            msg2.innerHTML=''
            // console.log(json.forecast)
            // console.log(json.temperature)
            // console.log(json.location)
            // console.log(json.address)
        }
    })
})