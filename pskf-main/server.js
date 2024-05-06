// server.js (Backend server)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Create an Express application
const app = express();
app.use(cors())

// Parse JSON request bodies
app.use(bodyParser.json());



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
