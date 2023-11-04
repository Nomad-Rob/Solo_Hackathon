function fetchNearestAircraft() {
  fetch('/nearest-aircraft')
      .then(response => response.json())
      .then(aircrafts => {
          const aircraftListElement = document.getElementById('aircraftList');
          aircraftListElement.innerHTML = ''; // Clear previous list
          aircrafts.forEach(aircraft => {
              const item = document.createElement('div');
              item.className = 'aircraft';
              item.textContent = `ICAO24: ${aircraft.icao24}, Call Sign: ${aircraft.callsign}, Country: ${aircraft.country}, Location: (${aircraft.latitude}, ${aircraft.longitude}), Altitude: ${aircraft.altitude}`;
              aircraftListElement.appendChild(item);
          });
      })
      .catch(error => console.error('Error:', error));
}
