/* API link
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=JPLQFA4N7KYQ9DW6YZ56UYGC7
*/

class WeatherData {
  /*Constructs a weather object with temperature in either celsius or fahrenheit (base), weather condition e.g. raining, humidity, date and time and wind speed*/
  constructor(temp, condition, humidity, DAT, wind){
    this.temp = temp;
    this.condition = condition;
    this.humidity = humidity;
    this.DAT = DAT;
    this.wind = wind;
  }

  /*Overrides the to string method for this class. Uses backticks which are located on top left of keyboard for my own future reference*/
  toString() {
    return `Temp: ${this.temp}, Condition: ${this.condition}, Humidity: ${this.humidity}, Date and Time: ${this.DAT}, Wind Speed: ${this.wind}`;
  }

  getTemp() {
    return this.temp;
  }

  getCondition() {
    return this.condition;
  }

  getHumidity() {
    return this.humidity;
  }

  getDAT() {
    return this.DAT;
  }

  getWind() {
    return this.wind;
  }

  setTemp(temp) {
    return this.temp = temp;
  }
}

async function getData(location) {
  try{
      const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '?key=JPLQFA4N7KYQ9DW6YZ56UYGC7', {mode: 'cors'});
      console.log("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=JPLQFA4N7KYQ9DW6YZ56UYGC7");
      const responseData = await response.json();

      if (!responseData.currentConditions) {
        alert("Weather data not available for this location.");
        return null;
      }

      let temp = responseData.currentConditions.temp;
      let condition = responseData.currentConditions.conditions;
      let humidity = responseData.currentConditions.humidity;
      let dat = responseData.currentConditions.datetime;
      let windSpeed = responseData.currentConditions.windspeed;

      return new WeatherData(temp, condition, humidity, dat, windSpeed);
    } catch(error){
      alert(error);
      return null;
    }
  }

  /*Base temp is in fahrenheit, so this alters it to celsius when the user selects that radiobutton*/
  function convertToCelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * 5 / 9;
    return celsius.toFixed(1) + "°C";
  }

/*Checks when the search button is clicked*/
const searchButton = document.getElementById("search");
searchButton.addEventListener("click", async () => {
  // Check if a radio button is selected
  const selectedRB = document.querySelector('input[name="toggle"]:checked');
  if (!selectedRB) {
    alert("Please select either Celsius or Fahrenheit.");
    return; 
  }

  const unit = selectedRB.value; 

  //Get the search location from the search bar if it exists
  const search = document.getElementById("location");
  const searchLocation = search.value;
  if (searchLocation !== "") {
    const data = await getData(searchLocation);
    if (data) {
      let temp = data.getTemp();
      let cond = data.getCondition();
      let humi = data.getHumidity();
      let time = data.getDAT();
      let wind = data.getWind();

      if (unit === "celsius") {
        temp = convertToCelsius(temp);
        data.setTemp(temp); 
      }

      populateDivs(data.getTemp(), cond, humi, time, wind);
    }
  } else {
    alert("Please search for a place");
    return;
  }
});

function populateDivs(temp, cond, humi, time, wind) {
  //Clear the divs first
  clearDivs();

  //Get the divs
  const tempDiv = document.getElementById("temperature");
  const condDiv = document.getElementById("condition"); 
  const humidDiv = document.getElementById("humidity");
  const timeDiv = document.getElementById("datetime");
  const windDiv = document.getElementById("windspeed");

  const tempContent = document.createElement("h3");
  const condContent = document.createElement("h3");
  const humidContent = document.createElement("h3");
  const timeContent = document.createElement("h3");
  const windContent = document.createElement("h3");

  tempContent.textContent = temp;
  condContent.textContent = cond;
  humidContent.textContent = humi;
  timeContent.textContent = time;
  windContent.textContent = wind;

  tempDiv.appendChild(tempContent);
  condDiv.appendChild(condContent);
  humidDiv.appendChild(humidContent);
  timeDiv.appendChild(timeContent);
  windDiv.appendChild(windContent);
}

function clearDivs() {
  //Get the divs
  const tempDiv = document.getElementById("temperature");
  const condDiv = document.getElementById("condition"); 
  const humidDiv = document.getElementById("humidity");
  const timeDiv = document.getElementById("datetime");
  const windDiv = document.getElementById("windspeed");

  tempDiv.innerHTML = "";
  condDiv.innerHTML = "";
  humidDiv.innerHTML = "";
  timeDiv.innerHTML = "";
  windDiv.innerHTML = "";

  //Add the titles back to the html
  const tempTitle = document.createElement("h3");
  const condTitle = document.createElement("h3");
  const humidTitle = document.createElement("h3");
  const timeTitle = document.createElement("h3");
  const windTitle = document.createElement("h3");

  tempTitle.textContent = "Temperature:";
  condTitle.textContent = "Condition:";
  humidTitle.textContent = "Humidity:";
  timeTitle.textContent = "Time:";
  windTitle.textContent = "Wind Speed:"

  tempDiv.appendChild(tempTitle);
  condDiv.appendChild(condTitle);
  humidDiv.appendChild(humidTitle);
  timeDiv.appendChild(timeTitle);
  windDiv.appendChild(windTitle);
}