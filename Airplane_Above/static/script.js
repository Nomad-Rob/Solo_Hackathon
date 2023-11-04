// Grabs the list of aircrafts from the server and displays a list of aircraft within 20 miles
function fetchNearestAircraft() {
  fetch('/nearest-aircraft')
      .then(response => response.json())
      .then(aircrafts => {
          const aircraftListElement = document.getElementById('aircraftList');
          aircraftListElement.innerHTML = ''; // Clear previous list
          const myLocation = { latitude: 37.7749, longitude: -122.4194 }; // Replace with your actual location
          const nearestAircraft = findNearestAircraft(aircrafts, myLocation);
          const item = document.createElement('div');
          item.className = 'aircraft';
          item.textContent = 
          `ICAO24: ${nearestAircraft.icao24},
          Call Sign: ${nearestAircraft.callsign},
          Country: ${nearestAircraft.country},
          Location: (${nearestAircraft.latitude}, ${nearestAircraft.longitude}),
          Altitude: ${nearestAircraft.altitude},
          Squawk: ${nearestAircraft.squawk},
          Velocity: ${nearestAircraft.velocity},
          Vertical Rate: ${nearestAircraft.vertical_rate},`;
          aircraftListElement.appendChild(item);
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
