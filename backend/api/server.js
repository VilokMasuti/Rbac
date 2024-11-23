// Import necessary modules
import jsonServer from 'json-server';

// Create server instance
const server = jsonServer.create();

// Define the router, pointing to the database file
const router = jsonServer.router('db.json');

// Apply default middlewares
const middlewares = jsonServer.defaults();

// Use the middlewares
server.use(middlewares);

// Use the router for handling API requests
server.use(router);

// Start the server on a specified port
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

// Export server if needed for other modules
export default server;
