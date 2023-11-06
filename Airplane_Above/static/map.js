// map.js

// Initialize the map
function initMap() {
  // Check if Geolocation is supported by the browser
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var myLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };

          var map = new google.maps.Map(document.getElementById('map'), {
              center: myLatLng,
              zoom: 15 // Adjust the zoom level as needed
          });

          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              title: 'My Location'
          });
      });
  } else {
      alert("Geolocation is not supported by your browser.");
  }
}
