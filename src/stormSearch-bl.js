class StormGlassApp {
  constructor() { //blank constructor
  }

  stormGlassLogic(latInput, longInput) { //method called on promise
    return new Promise(function(resolve, reject) {

      let stormRequest = new XMLHttpRequest(); // creating instance on js built in object
      let url = `https://api.stormglass.io/forecast?key=${process.env.STORMAPI_KEY}&lat=${latInput}&lng=${longInput}`;

      stormRequest.onload = function() {
        if (this.status === 200) {
          resolve(stormRequest.response);//run the function
          console.log(resolve(stormRequest.response));
        } else {
          reject(Error(stormRequest.statusText));
        }
      }
      stormRequest.open("GET", url, true);
      stormRequest.send();
    });
  }
}


export { StormGlassApp };
