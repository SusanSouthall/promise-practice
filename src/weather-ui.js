import { WeatherApp } from './weather-bl.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function(){
  $("#search-jQuery").click(function() {

    let userSearchZip = $('#zip-location').val();
    // console.log(userSearchZip);

    // JQuery API
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${userSearchZip}&appid=${process.env.API_KEY}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#weather-output').empty();
        // console.log(response);
        $('#weather-output').append("<strong>Humidity: </strong>" + response.name + "</br></strong>");
        $('#weather-output').append("<strong>Zip: </strong>" + userSearchZip + "</br></strong>");
        $('#weather-output').append("<strong>Humidity: </strong>" + response.main.humidity + "</br></strong>");
        $('#weather-output').append("<strong>Pressure: </strong>" + response.main.pressure + "</br></strong>");
        $('#weather-output').append("<strong>Temperature: </strong>" + response.main.temp + "</br></strong>");
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    }); //closes ajax
  });//close ajax function

  $("#search-js").click(function() {
    let userSearchCity = $('#city-location').val();
    $('#city-location').val(""); //empty input
    // console.log(userSearchCity);

    // JavaScript API
    let promise = new Promise(function(resolve, reject){ //instance created on built in ES6 object to pass arguements
      let weatherRequest = new XMLHttpRequest(); // creating instance on js built in object
      let url = `http://api.openweathermap.org/data/2.5/forecast?q=${userSearchCity}&appid=${process.env.API_KEY}`;
      console.log(url);
      weatherRequest.onload = function() {
        if (this.status === 200) {
          resolve(weatherRequest.response);
        } else {
          reject(Error(weatherRequest.statusText));
        }
      }
      weatherRequest.open("GET", url, true);
      console.log(weatherRequest.open("GET", url, true));
      weatherRequest.send();
      console.log(weatherRequest.send());
    });//close promise

    promise.then(function(response) {
      let body = JSON.parse(response);
      // let body = XMLHttpRequest.parse(response);
      console.log(body);
      $('#city-location').text(`The humidity in ${city} is ${body.main.humidity}%`);
    }, function(error) {
      $('#errors2').text(`There was an error processing your request!`);
    });
  });//close js
});//closes document
