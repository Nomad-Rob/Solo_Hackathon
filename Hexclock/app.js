// Get elements from the DOM
let hrs = document.getElementById('hrs');
let mins = document.getElementById('mins');
let secs = document.getElementById('secs');
const hexText = document.querySelector('.hex__text');
const hero = document.querySelector('.hero'); // Select the hero element

// Function to update the clock and hex color
function updateClockAndHexColor() {
  let currentTime = new Date();

  // Update clock
  hrs.innerHTML = currentTime.getHours().toString().padStart(2, "0");
  mins.innerHTML = currentTime.getMinutes().toString().padStart(2, "0");
  secs.innerHTML = currentTime.getSeconds().toString().padStart(2, "0");

  // Update hex color
  const hoursHex = currentTime.getHours().toString(16).padStart(2, '0');
  const minutesHex = currentTime.getMinutes().toString(16).padStart(2, '0');
  const secondsHex = currentTime.getSeconds().toString(16).padStart(2, '0');
  const hexColor = `#${hoursHex}${minutesHex}${secondsHex}`;
  hexText.textContent = hexColor;

  // Update background color to be just the current hex color
  hero.style.background = hexColor;
}

// Initialize the clock and hex color on load
updateClockAndHexColor();

// Set the interval to update every second
setInterval(updateClockAndHexColor, 1000);
