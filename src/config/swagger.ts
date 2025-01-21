import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Vercel API Documentation',
      version: '1.0.0',
      description: 'API documentation for Node Vercel project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.vercel.app',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    const swaggerFile = path.join(process.cwd(), 'swagger.json');
    if (fs.existsSync(swaggerFile)) {
        const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        console.log('✅ Swagger UI available at /api-docs');
    } else {
        console.warn('⚠️ swagger.json not found. Run generate-swagger.sh to generate it.');
    }
};

export default swaggerSpec; 