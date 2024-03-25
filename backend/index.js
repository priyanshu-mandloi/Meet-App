const express = require('express'); // Express framework for routing and middleware
const app = express(); // Create Express app
require('dotenv').config(); // Load environment variables from .env file
const http = require('http'); // HTTP module for creating server
const server = http.createServer(app); // Create HTTP server
const mongoose = require('mongoose'); // MongoDB ORM library
const cors = require('cors'); // CORS middleware for enabling Cross-Origin Resource Sharing
const socket = require('socket.io'); // Socket.io for real-time communication
const io = socket(server, { // Initialize Socket.io server
  cors: {
    origin: '*', // Allow requests from any origin (you may want to restrict this in production)
    methods: ["GET", "POST"] // Allowed HTTP methods
  }
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection URI from environment variables
mongoose.connect(MONGODB_URI, {}).then(() => {
  console.log('Connected to MongoDB'); // Log success message when connected to MongoDB
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error); // Log error message if failed to connect to MongoDB
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies in requests

// routes
// const mainRouter = require('./routes/auth');
// app.use('/api',mainRouter);


// Socket.io events
io.on('connection', (socket) => { // Handle socket connection
  socket.emit('me', socket.id); // Emit 'me' event with socket ID to the client
  socket.on('disconnect', () => { // Handle disconnection
    socket.broadcast.emit('callended'); // Emit 'callended' event to all clients upon disconnection
  });
  socket.on('calluser', ({ userToCall, signalData, from, name }) => { // Handle 'calluser' event
    io.to(userToCall).emit('calluser', { signal: signalData, from, name }); // Emit 'calluser' event with signal data to specified user
  });
  socket.on('answercall', (data) => { // Handle 'answercall' event
    io.to(data.to).emit('callaccepted', data.signal); // Emit 'callaccepted' event with signal data to specified user
  });
});

// Default route
app.get('/', function (req, res) {
  res.send("Server is running"); // Send response for default route
});

// Start the server
const PORT = process.env.PORT || 5000; // Port number from environment variables or default to 5000
server.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`); // Log server listening message
});
