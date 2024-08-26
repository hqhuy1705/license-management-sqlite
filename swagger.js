const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'License Management API',
      version: '1.0.0',
      description: 'API documentation for the License Management Server',
    },
    servers: [
      {
        url: 'http://localhost:5001', // Replace with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (this points to your route files)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
