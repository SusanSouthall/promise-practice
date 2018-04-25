import { WeatherApp } from './weather-bl.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

function getElements(response, userSearchCity) {
  console.log();
  // console.log(response);
  $('#weatherZip-output').append("<strong>" + userSearchCity + "</strong>" + "</br>");
  $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].main.temp + " Kelvins</br></strong>");
  $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].main.temp + " Kelvins</br></strong>");
  $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].main.temp + " Kelvins</br></strong>");
}

$(document).ready(function(){
  $("#search-jQuery").click(function() {

    let userSearchZip = $('#zip-location').val();
    // console.log(userSearchZip);

    // JQuery API Call (AJAX)
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
      let classCaller = new WeatherApp();//instance to grab class from BL
      let userSearchCity = $('#city-location').val();
    // console.log(userSearchCity);
    $('#city-location').val(""); //empty input
    let promise = classCaller.weatherLogic(userSearchCity);//run this instance on the method from the BL
    promise.then(function(response){
      response = JSON.parse(response); //cleans code
      getElements(response, userSearchCity); //calls on the function
    }, function(Error) { //display error
      console.log("Sorry, there is an Error loading your requested information!");
    });
  });//close js
});//closes document
