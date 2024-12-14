console.log("js linked");

/* API link
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=JPLQFA4N7KYQ9DW6YZ56UYGC7
*/


async function getTemp() {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=JPLQFA4N7KYQ9DW6YZ56UYGC7', {mode: 'cors'});
    response.json().then(function(response) {
      console.log(response.currentConditions);
    });
  }

  getTemp();

  function convertToCelsius(fahrenheit) {
    let celsius = ((fahrenheit - 32) * 5/9);
    return celsius; 
  }

  //What my app will have:
  /* 
  temperature in either celsius or fahrenheit
  Status: cloudy, sunny raining etc
  Humidity
  Date and time
  Wind speed
  */