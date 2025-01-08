require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const configureExpress = require('./config/express');
const configureRoutes = require('./config/routes');

const app = express();

// Connect to Database
connectDB();

// Configure Express
configureExpress(app);

// Configure Routes
configureRoutes(app);

const PORT = process.env.PORT || 3000;

// Add error handling for port conflicts
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });