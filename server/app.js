// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// Initialize express app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Import routes and services
require('./router')(app);
require('./services')(app);
// Start the server
const PORT = 5000;
app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});
