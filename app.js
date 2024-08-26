const express = require('express');
const dotenv = require('dotenv');
const licenseRoutes = require('./routes/licenseRoutes');
const setupDatabase = require('./config/dbSetup'); // Import the database setup function
const setupSwagger = require('./swagger'); // Import the Swagger setup function

dotenv.config();

const app = express();
app.use(express.json());

setupSwagger(app); // Set up Swagger

// Run the database setup when the server starts
setupDatabase();

app.use('/api/license', licenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
