document.addEventListener("DOMContentLoaded", function() {
  // Initialize the frog image
  fetchFrogImage();

  // Predefined frog responses
  const frogResponses = [
    "Ribbit! What's hopping?",
    "Just chilling on my lilypad, how about you?",
    "Leapin' lily flowers! That's fascinating!",
    "Hop to it, let's chat!",
    "Feelin' froggy today? Jump into the conversation!",
    "Croak! Did you say flies? My favorite!",
    "Pond-er this for a second...",
    "Let's not jump to conclusions now.",
    "Catch any good bugs lately?",
    "You've got a friend in the pond.",
    "Bogged down with work? Take a leap and relax!",
    "Frog’s honor, I won’t tell a tadpole.",
    "I'm all ears—well, if I had them!",
    "You make my heart ribbit.",
    "Stay hydrated! The pond's not the same without you."
  ];

  // Handle sending messages
  function sendMessage() {
    const userInput = document.getElementById('user-input');
    if (userInput.value.trim() !== '') {
      addMessageToChat('user', userInput.value);
      userInput.value = ''; // Clear the input
      setTimeout(() => {
        const randomResponse = frogResponses[Math.floor(Math.random() * frogResponses.length)];
        addMessageToChat('frog', randomResponse);
      }, 1000); // Simulate a short reply delay
    }
  }

  document.getElementById('send-message').addEventListener('click', sendMessage);

  document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default behavior of the "Enter" key
      sendMessage();
    }
  });

  // Fetch a frog image from Unsplash
  function fetchFrogImage() {
    fetch('/api/frog')
      .then(response => response.json())
      .then(data => {
        document.getElementById('frog-image').src = data.imageUrl;
      })
      .catch(err => {
        console.error('Error fetching image:', err);
        document.getElementById('frog-image').src = './assets/fallback-frog-image.png';
      });
  }
  
  setInterval(function() {
    document.getElementById("frog-image").classList.add("hop");
    setTimeout(function() {
      document.getElementById("frog-image").classList.remove("hop");
    }, 500);
  }, 5000);

  // Add messages to chat
  function addMessageToChat(sender, message) {
    const chatArea = document.getElementById('chat-area');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    if (sender === 'user') {
      messageDiv.classList.add('user-message');
    } else {
      messageDiv.classList.add('frog-message');
    }
    messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Frog'}:</strong> ${message}`;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the bottom
  }
  
  // Add this inside your DOMContentLoaded event listener in chat.js

// Function to create a single frog image
function createFrogStampede() {
  const container = document.getElementById('frog-stampede-container');
  container.innerHTML = ''; // Clear previous frogs
  
  // Create 30 frog images
  for (let i = 0; i < 30; i++) {
    const img = document.createElement('img');
    img.src = './assets/fallback-frog-image.png'; // Path to your frog stampede image
    img.className = 'frog-stampede';
    container.appendChild(img);
  }
  
  // Create and show the text "Frogs!!!"
  const text = document.createElement('div');
  text.id = 'frogs-text';
  text.textContent = 'Frogs!!!';
  container.appendChild(text);
  
  // Trigger the text animation
  setTimeout(() => {
    text.style.display = 'block';
    text.style.animationPlayState = 'running';
  }, 500); // Slightly delay the text appearance
  
  // Hide the text after a short while
  setTimeout(() => {
    text.style.display = 'none';
  }, 1500); // Hide the text before the next stampede starts
}

// Initialize the frog stampede to run every 2 seconds
setInterval(createFrogStampede, 2000);

// Call the function immediately to start the stampede
createFrogStampede();


  
});
// Initialize the frog stampede to run every 1 second
setInterval(createFrogStampede, 1000);

// Call the function immediately to start the stampede
createFrogStampede();
