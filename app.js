var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=TvvOQacpiREHyKbOHcTL7-Gz0OrRmLzXXBAc_3usebw";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const handleResponse = (response) => {
  const jsonified = JSON.parse(response);
  const plants = jsonified.data;
  console.log(plants)
  
  const filteredPlants = plants.filter((element) => {
    return element.family_common_name = "Grass family";
  })

  for (const plant of filteredPlants) {
    turnPlantIntoHtml(plant);
  }
}

const turnPlantIntoHtml = (plant) => {
  const plantDiv = document.createElement("div");
  plantDiv.innerText = plant.common_name + " - " + plant.scientific_name;
  const mainContainerDiv = document.getElementById("mainContainer")
  mainContainerDiv.appendChild(plantDiv)
}
