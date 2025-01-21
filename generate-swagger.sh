#!/bin/bash

# Create swagger config file if it doesn't exist
cat > swagger.config.js << 'EOL'
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js TypeScript Express API',
      version: '1.0.0',
      description: 'A RESTful API with user authentication functionality',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);
const fs = require('fs');

// Write swagger.json
fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Swagger documentation generated successfully!');
EOL

# Make the script executable
chmod +x generate-swagger.sh

# Run the swagger generation
echo "Generating Swagger documentation..."
node swagger.config.js 