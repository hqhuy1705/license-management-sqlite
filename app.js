const express = require('express');
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth');
const licenseRoutes = require('./routes/licenseRoutes');
const setupDatabase = require('./config/dbSetup'); // Import the database setup function
const setupSwagger = require('./swagger'); // Import the Swagger setup function

dotenv.config();

const app = express();
app.use(express.json());

// Basic Authentication setup
const users = {
    [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD
  };
  
  app.use(basicAuth({
    users,
    challenge: true, // This will prompt the browser to show a login dialog
    unauthorizedResponse: 'Unauthorized'
  }));

setupSwagger(app); // Set up Swagger

// Run the database setup when the server starts
setupDatabase();

app.use('/api/license', licenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
