////////////////////////////////////////////////////////////////////////////////
//////////////////////////////  Part Four //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Let's take a look at our previous example in it's entirety now, sans comments
// for readability, then I'm going to break it down one more time

//////////////////////////
// Filename: scripts.js //
//////////////////////////


class WeatherApp {
  constructor() { //blank constructor

  }
}

// WeatherApp.prototype.getData = function(userInput, displayData) {
//   $.get('https://www.fictionalapi.xyz/endpoint?' + userInput)
//     .then(function(results) {
//       displayData(results);
//     })
//     .fail(function() {
//       console.log('something went wrong');
//     });
// }

export { WeatherApp };
