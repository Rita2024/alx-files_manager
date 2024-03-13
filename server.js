const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes'); // Load routes from index.js in routes folder

// Middleware to handle routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

