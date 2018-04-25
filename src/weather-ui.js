import { WeatherApp } from './weather-bl.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function(){
  $("#search-jQuery").click(function() {

    let userSearchZip = $('#zip-location').val();
    // console.log(userSearchZip);

    // JQuery API Call
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
  // JavaScript API Call
  $("#search-js").click(function() {
    let userSearchCity = $('#city-location').val();
    $('#city-location').val(""); //empty input
    // console.log(userSearchCity);
    // let promise = new Promise(function(resolve, reject){ //instance created on built in ES6 object to pass arguements
      let weatherRequest = new XMLHttpRequest(); // creating instance on js built in object
      let url = `http://api.openweathermap.org/data/2.5/forecast?q=${userSearchCity}&appid=${process.env.API_KEY}&cnt=5`;

      weatherRequest.onload = function() {
        if (this.status === 200) {
          console.log(response);
          let response = JSON.parse(this.responseText);
          getElements(response);//run the function
          console.log(getElements(response));
        }
      }
      weatherRequest.open("GET", url, true);
      weatherRequest.send();

      function getElements(response) {
        $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].weather[0].description.main + "</br></strong>");
      // $('#weatherZip-output').text(``);
      }
  });//close js

    // promise.then(function(response) {
    //   let body = JSON.parse(response);
    //   // let body = XMLHttpRequest.parse(response);
    //   console.log(body);
    //   //$('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].weather[0].description.main + "</br></strong>");
    //   getElements(response);
    // }
    // }, function(error) {
    //   $('#errors2').text(`There was an error processing your request!`);
    // });

});//closes document
