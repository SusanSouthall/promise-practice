// import $ from 'jquery';

class WeatherApp {
  constructor() { //blank constructor
  }

  weatherLogic(capUserSearchCity) {
    return new Promise(function(resolve, reject) {

      let weatherRequest = new XMLHttpRequest(); // creating instance on js built in object
      let url = `http://api.openweathermap.org/data/2.5/forecast?q=${capUserSearchCity}&appid=${process.env.API_KEY}&cnt=5`;

      weatherRequest.onload = function() {
        if (this.status === 200) {
          resolve(weatherRequest.response);//run the function
        } else {
          reject(Error(weatherRequest.statusText));
        }
      }
      weatherRequest.open("GET", url, true);
      weatherRequest.send();
    });
  }
}




export { WeatherApp };
