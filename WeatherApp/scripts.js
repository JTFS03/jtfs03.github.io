// Wait for the page to fully load before running JavaScript
document.addEventListener("DOMContentLoaded", function(){

// Grab all elements we will interact with on the page
const city = document.getElementById("city")
const changeLocation = document.getElementById("changeLocation")
const modal = document.getElementById("modal")
const submitLocation = document.getElementById("submitLocation")
const locationInput = document.getElementById("locationInput")


// This function contacts the weather API and updates the page
function getWeather(location){

// Show which location we are requesting (for debugging)
console.log("Fetching weather for:", location)

// Weather API request for a 3-day forecast
const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`

// Fetch weather data from RapidAPI
fetch(url, {
method: "GET",
headers: {
"Content-Type": "application/json",
"x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
"x-rapidapi-key": "YOUR_API_KEY_HERE"
}
})

// Convert response to JSON
.then(response => response.json())

// Use returned data to update the UI
.then(data => {

// Log full response for debugging
console.log(data)

// Stop if the location is invalid
if(!data.location) return

// Update city name at the top
city.textContent = data.location.name

// Loop through each forecast day
data.forecast.forecastday.forEach((day, index) => {

const i = index + 1

// Update weather icon
document.getElementById(`icon${i}`).src =
"https:" + day.day.condition.icon

// Update average temperature
document.getElementById(`temp${i}`).textContent =
day.day.avgtemp_f + "°"

// Update condition text
document.getElementById(`condition${i}`).textContent =
day.day.condition.text

// Update high temperature
document.getElementById(`high${i}`).textContent =
"High: " + day.day.maxtemp_f + "°"

// Update low temperature
document.getElementById(`low${i}`).textContent =
"Low: " + day.day.mintemp_f + "°"

})

})

// Catch errors if API fails
.catch(error => console.log(error))

}


// Load default weather when page first opens
getWeather("Pullman")


// Open the modal when user clicks change location
changeLocation.addEventListener("click", function(){
modal.style.display = "flex"
})


// When user submits a new location, fetch weather and close modal
submitLocation.addEventListener("click", function(){

// Read user input
let newLocation = locationInput.value

// Get new weather data
getWeather(newLocation)

// Hide modal
modal.style.display = "none"

// Clear input field
locationInput.value = ""

})

})