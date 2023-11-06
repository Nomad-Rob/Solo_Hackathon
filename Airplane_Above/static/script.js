// Grabs the list of aircrafts from the server and displays a list of aircraft within 20 miles
function fetchNearestAircraft() {
  fetch('/nearest-aircraft')
      .then(response => response.json())
      .then(aircrafts => {
          const aircraftListElement = document.getElementById('aircraftList');
          aircraftListElement.innerHTML = ''; // Clear previous list
          const myLocation = { latitude: 37.7749, longitude: -122.4194 }; // Replace with your actual location
          const nearestAircraft = findNearestAircraft(aircrafts, myLocation);
          
          // Function to create a row with a description and data
          function createRow(description, data) {
            const row = document.createElement('div');
            row.className = 'row';
            row.innerHTML = `
              <div class="col-4">${description}:</div>
              <div class="col-8">${data}</div>
            `;
            return row;
          }

          // Create rows with descriptions and data for each attribute
          const attributes = [
            { description: 'ICAO24', data: nearestAircraft.icao24 },
            { description: 'Call Sign', data: nearestAircraft.callsign },
            { description: 'Country', data: nearestAircraft.country },
            { description: 'Location', data: `(${nearestAircraft.latitude}, ${nearestAircraft.longitude})` },
            { description: 'Altitude', data: nearestAircraft.altitude },
            { description: 'Squawk', data: nearestAircraft.squawk },
            { description: 'Velocity', data: nearestAircraft.velocity },
            { description: 'Vertical Rate', data: nearestAircraft.vertical_rate },
          ];

          attributes.forEach(attribute => {
            const row = createRow(attribute.description, attribute.data);
            aircraftListElement.appendChild(row);
          });
      })
      .catch(error => console.error('Error:', error));
}


// Filters the list of aircrafts to find the nearest one
function findNearestAircraft(aircrafts, myLocation) {
  let nearestAircraft = null;
  let nearestDistance = Infinity;
  aircrafts.forEach(aircraft => {
    const distance = calculateDistance(myLocation.latitude, myLocation.longitude, aircraft.latitude, aircraft.longitude);
    if (distance < nearestDistance) {
      nearestAircraft = aircraft;
      nearestDistance = distance;
    }
  });
  return nearestAircraft;
}

// Calculates the distance between two points on the Earth
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d;
}
