import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript Express!' });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at http://localhost:${port}/api-docs`);
}); 