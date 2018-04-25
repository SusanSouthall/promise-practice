import { WeatherApp } from './weather-bl.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function(){
  $("#search-jQuery").click(function() {

    let userSearchZip = $('#location').val();
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
    // JavaScript API

  });//closes submit function
});//closes document


  //     // Simple array with 3 objects in it, that each have a single property of
  //     // name to some random name
  //     $.get('https://www.fictionalapi.xyz/endpoint?' + userInput)
  //       .then(function(results) {
  //         // Here is where we would want to display the information to screen
  //         results.forEach(function(result) {
  //           $('#some-unordered-list').append('<li>' + result.name + '</li>');
  //         });
  //       })
  //       .fail(function() {
  //         console.log('something went wrong');
  //       });
  //   });
  // });

//
//   // Assuming this code was tied to an actual HTML page, and the API really existed,
//   // and the HTML page included the appropriate element IDs as I've referenced,
//   // this should display all of the results to the page in the form of:
//   // <ul>
//   //   <li>John</li>
//   //   <li>Jacob</li>
//   //   <li>Jingleheimerschmidt</li>
//   // </ul>
//
//   ////////////////////////////////////////////////////////////////////////////////
//   ///////////////////////////////  Part Two  /////////////////////////////////////
//   ////////////////////////////////////////////////////////////////////////////////
//
//   // Now, the $.get() method is a method that should be reserved for the business
//   // logic as it has to do with retrieving data from somewhere other than the
//   // user, so let's refactor our project into separate files using the exports and
//   // requires, creating an application module, and a method for retrieving said data
//
//   //////////////////////////
//   // Filename: scripts.js //
//   //////////////////////////
//
//   // Here is our constructor, there are no need for any arguments when creating it
//   // at this point in the scenario so we're not going to define any parameters
//   var ApplicationModule = function() {
//
//   }
//
//   // Now, we need a method for retrieving data
//   ApplicationModule.prototype.getData = function(userInput) {
//     //let's take the $.get() method from the previous iteration of
//     //scripts-interface.js and place it here
//     $.get('https://www.fictionalapi.xyz/endpoint?' + userInput)
//       .then(function(results) {
//         // Here is where we would want to display the information to screen
//         results.forEach(function(result) {
//           $('#some-unordered-list').append('<li>' + result.name + '</li>');
//         });
//       })
//       .fail(function() {
//         console.log('something went wrong');
//       });
//
//     // Note: we don't necessarily need to return anything here because at this
//     // point, incorrectly, our business logic is putting the information on the
//     // page for us, we'll get to that in a minute.
//   }
//
//   // Export our application module so the UI logic can see it:
//   exports { ApplicationModule };
//
//   // Now, lets take a look at the new version of our scripts-interface.js
//
//   ////////////////////////////////////////////////////////////////////////////////
//
//   ////////////////////////////////////
//   // Filename: scripts-interface.js //
//   ////////////////////////////////////
//
//   // We need our ApplicationModule, so let's require it at the top (we'll assume
//   // they are in the same directory ignoring the dev environement/building and all
//   // that jazz)
//   var ApplicationModule = require('./scripts.js').applicationModule;
//
//   $(document).ready(function() {
//     // Now that we've imported our module to be available, we need to construct an
//     // instance of it. AKA Instantiate it.
//     var applicationModule = new ApplicationModule(); //empty
//
//     // Submit event for the form
//     $('#some-form').submit(function(event) {
//       event.preventDefault();
//
//       // Gather inputted information from the form and store it into userInput
//       var userInput = $('#text-input').val();
//
//       // We created a method on the applicationModule to be able to get our data,
//       // so let's call it
//       applicationModule.getData(userInput);
//     });
//   });
//
//   // Cool, this code should work the same as it did in the first exmaple, but has
//   // the benefit of being split into two files.
//
//   ////////////////////////////////////////////////////////////////////////////////
//   //////////////////////////////  Part Three  ////////////////////////////////////
//   ////////////////////////////////////////////////////////////////////////////////
//
//   // Now we can address the asynchronicity (async) issue, that leads to this funky
//   // kind of way that we separate UI and business logic in this type of application,
//   // but first let's talk about what the issue actually is.
//
//   // So, async is a way that JS can run certain blocks of code in the background
//   // which results in the code after it running first... In our example, if we
//   // were to simply just return the results array, then in the UI logic try and
//   // then append it to the screen, it would fail. Specifically because the loop
//   // trying to append the list items with the names in it, would run before
//   // the server got a chance to respond with the data, even though it's only
//   // a few milliseconds. So when the loop would try to run, the variable it was
//   // trying to loop over would be either undefined, or an array with 0 length.
//
//   // So, the approach we are going to take is write a function that takes in one
//   // argument, the results, then appends them to the screen. We did this a lot in
//   // Intro with things like the address book app, and really any time we had to
//   // separate business and UI logic on any project... the function is going to look
//   // like this:
//
//   var displayData = function(results) {
//     results.forEach(function(result) {
//       $('#some-unordered-list').append('<li>' + result.name + '</li>');
//     });
//   }
//
//   // Which is just that loop that's inside the $.get() method. It doesn't need to
//   // return anything because it's not doing anything to any data, it's just
//   // shoving it onto the page.
//
//   // Now we can't just call this function from the business logic for the same reason
//   // that we had to export and require the scripts.js into scripts-interface.js.
//   // It just can't see it, but instead of requiring it, we have another option to
//   // be able to expose it to the getData method.
//
//   // Probably have noticed there's multiple ways to define functions, like:
//   // function myFunction() {}, or var myFunction = function() {}
//   // I wrote it the second way this time to help illustrate what's going on...
//   // Our displayData function is literally a function that is stored inside
//   // the variable displayData. Just like any other variable, we can pass this
//   // function into another function or method by way of argument/paramenter.
//   // That looks like this...
//
//   // Here is a fake method defined in the business logic:
//   FakeModule.prototype.fakeMethod = function(input, fakeDisplayData) {
//     $.get('someaddress')
//       .then(function(results) {
//         fakeDisplayData(results); //This is the new piece, in that we're calling
//         // a function that was passed into the method as an argument
//       });
//   }
//   // Here is the function as it would be written in scripts-interface.js
//   var fakeDisplayData = function(results) {
//     results.forEach(function(result) {
//       $('#something').append(result.thing);
//     });
//   }
//
//   // Here is where the method would be called in the actual piece of the UI logic
//   // that is doing something, in this case, a submit event
//   // We're assuming the exports and require and object instantiation have all been
//   // done already
//   $('#someform').submit(function(event) {
//     event.preventDefault();
//
//     var input = $('input').val();
//
//     // Here we're going to pass two arguments, one the input gathered from the user
//     // the second, the actual function fakeDisplayData, so the method
//     // can see it.
//     fakeModule.fakeMethod(input, fakeDisplayData);
//   }
//
//
//   ////////////////////////////////////
//   // Filename: scripts-interface.js //
//   ////////////////////////////////////
//
//   var ApplicationModule = require('./scripts.js').applicationModule;
//
//   var displayData = function(results) {
//     results.forEach(function(result) {
//       $('#some-unordered-list').append('<li>' + result.name + '</li>');
//     });
//   }
//
//   $(document).ready(function() {
//     var applicationModule = new ApplicationModule();
//
//     $('#some-form').submit(function(event) {
//       event.preventDefault();
//
//       var userInput = $('#text-input').val();
//       applicationModule.getData(userInput, displayData);
//     });
//   });
// });
