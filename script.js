// Write your JavaScript code here!

window.addEventListener("load", function() {
   
});

window.addEventListener("load", function () {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("#pilotName input");
   let coPilotName = document.querySelector("#coPilotName input");
   let fuelLevel = document.querySelector("#fuelLevel input");
   let cargoMass = document.querySelector("#cargoMass input");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let randomPlanet = json[Math.floor(Math.random() * json.length)];
         console.log(randomPlanet);
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${randomPlanet.name}</li>
                  <li>Diameter: ${randomPlanet.diameter}</li>
                  <li>Star: ${randomPlanet.star}</li>
                  <li>Distance from Earth: ${randomPlanet.distance}</li>
                  <li>Number of Moons: ${randomPlanet.moons}</li>
               </ol>
            <img src="${randomPlanet.image}">
         `;
      });
   });

   form.addEventListener("submit", function (event) {
      event.preventDefault();
      document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
      document.getElementById("launchStatus").style.color = "#008000";
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `Pilot ${coPilotName.value} is ready for launch.`;

      if (!isNaN(Number(pilotName.value)) || !isNaN(Number(coPilotName.value)) || isNaN(Number(cargoMass.value)) || isNaN(Number(fuelLevel.value))) {
         alert("Make sure to enter valid information for each field!");
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch!`;
         document.getElementById("launchStatus").style.color = "#FF0000";
      } else if (
         pilotName.value === "" ||
         coPilotName.value === "" ||
         isNaN(Number(fuelLevel.value)) ||
         isNaN(Number(cargoMass.value))
      ) {
         alert("All fields are required!");
      }
      if (Number(fuelLevel.value) < 10000) {
         document.getElementById("fuelStatus").innerHTML = 'Not enough fuel for the journey!';
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch!`;
         document.getElementById("launchStatus").style.color = "#FF0000";
         document.getElementById("faultyItems").style.visibility = "visible";
      };
      if (Number(cargoMass.value) > 10000) {
         document.getElementById("cargoStatus").innerHTML = 'Shuttle too heavy for liftoff!';
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch!`;
         document.getElementById("launchStatus").style.color = "#FF0000";
         document.getElementById("faultyItems").style.visibility = "visible";
      }
   });
});



