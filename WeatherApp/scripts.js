document.addEventListener("DOMContentLoaded", function(){

const city = document.getElementById("city")

const changeLocation = document.getElementById("changeLocation")
const modal = document.getElementById("modal")
const submitLocation = document.getElementById("submitLocation")
const locationInput = document.getElementById("locationInput")

function getWeather(location){

console.log("Fetching weather for:", location)

const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`

fetch(url, {
method: "GET",
headers: {
"Content-Type": "application/json",
"x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
"x-rapidapi-key": "YOUR_KEY"
}
})
.then(response => response.json())
.then(data => {

if(!data.location) return

city.textContent = data.location.name

data.forecast.forecastday.forEach((day, index) => {

const i = index + 1

document.getElementById(`temp${i}`).textContent =
day.day.avgtemp_f + "°"

document.getElementById(`condition${i}`).textContent =
day.day.condition.text

document.getElementById(`high${i}`).textContent =
"High: " + day.day.maxtemp_f + "°"

document.getElementById(`low${i}`).textContent =
"Low: " + day.day.mintemp_f + "°"

})

})
.catch(error => console.log(error))

}

getWeather("Pullman")

changeLocation.addEventListener("click", function(){
modal.style.display = "flex"
})

})