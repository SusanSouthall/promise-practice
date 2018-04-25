import $ from 'jquery';

class WeatherApp {
  constructor() { //blank constructor
  }

  weatherLogic(userSearchCity) {
    let weatherRequest = new XMLHttpRequest(); // creating instance on js built in object
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${userSearchCity}&appid=${process.env.API_KEY}&cnt=5`;

    weatherRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        // console.log(response);
        getElements(response);//run the function
      }
    }
    weatherRequest.open("GET", url, true);
    weatherRequest.send();

    function getElements(response) {
      console.log(response);
      $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].weather[0].main + " skies</br></strong>");
      $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].main.temp + " Fahrenheit</br></strong>");
      $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].weather[0].main + " skies</br></strong>");
      $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].main.temp + " Fahrenheit</br></strong>");
      $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].weather[0].main + " skies</br></strong>");
      $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].main.temp + " Fahrenheit</br></strong>");
    // $('#weatherZip-output').text(``);
    }
  }
}



export { WeatherApp };
