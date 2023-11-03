require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get('/api/frog', async (req, res) => {
  const url = `https://api.unsplash.com/photos/random?query=frog&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      res.json({ imageUrl: data.urls.regular });
    } else {
      res.status(response.status).json({ message: data.errors || 'Error fetching image' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error communicating with Unsplash' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
