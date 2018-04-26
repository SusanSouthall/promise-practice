import { WeatherApp } from './weather-bl.js';
import { StormGlassApp } from './stormSearch-bl.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

function getElements(response, capUserSearchCity) {
  console.log();
  // console.log(response);
  $('#weatherZip-output').append("<strong>" + capUserSearchCity + "</strong>" + "</br>");
  $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 1: </strong>" + response.list[0].main.temp + " Kelvins</br></strong>");
  $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 2: </strong>" + response.list[1].main.temp + " Kelvins</br></strong>");
  $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].weather[0].main + " skies</br></strong>");
  $('#weatherZip-output').append("<strong>Day 3: </strong>" + response.list[2].main.temp + " Kelvins</br></strong>");
}

function getElementsStorm(response, longInput, latInput) {

  for (let key in response.hours[0]) {
    if(key.includes('waveDirection') && response.hours[0] != null && response.hours[0] != '') {
      // console.log("this is getElementsStorm value: " + key);
      $('#weather-long-lat-output').append("<strong>Current Wave Direction: </strong>" + response.hours[0][key][0].value);
    }
    if(key.includes('waveHeight') && response.hours[0] != null && response.hours[0] != '') {
      // console.log("this is getElementsStorm value: " + key);
      $('#weather-long-lat-output').append("</br><strong>Current Wave Height: </strong>" + response.hours[0][key][0].value);
    }
  }
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
      let capUserSearchCity = userSearchCity.charAt(0).toUpperCase() + userSearchCity.slice(1).toLowerCase();
    // console.log(userSearchCity);
    $('#city-location').val(""); //empty input
    let promise = classCaller.weatherLogic(capUserSearchCity);//run this instance on the method from the BL
    promise.then(function(response){
      response = JSON.parse(response); //cleans code
      getElements(response, capUserSearchCity); //calls on the function
    }, function(Error) { //display error
      console.log("Sorry, there is an Error loading your requested information!");
    });
  });//close js





  $("#search-js-2").click(function() {
      let classCaller = new StormGlassApp();//instance to grab class from BL
      let longInput = $('#long-input').val();
      let latInput = $('#lat-input').val();
    // console.log(userSearchCity);
    $('#long-input').val(""); //empty input
    $('#lat-input').val(""); //empty input
    let promise = classCaller.stormGlassLogic(latInput, longInput);//run this instance on the method from the BL
    promise.then(function(response){
      response = JSON.parse(response); //cleans code
      // console.log(response + "this is after the promise");
      getElementsStorm(response, longInput, latInput); //calls on the function outside document ready function
    }, function(Error) { //display error
      console.log("Sorry, there is an Error loading your requested information!");
    });
  });//close js
});//closes document
