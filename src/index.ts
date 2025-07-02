import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import homicideRoutes from './routes/homicideRoutes';
import { setupSwagger } from './config/swagger';
import { startServer } from './utils/banner';
import path from 'path';
import cors from 'cors';
import testRouter from './controllers/testeController';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration

app.use(cors());

// Setup Swagger UI
setupSwagger(app);

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz que serve o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use('/', testRouter);
app.use('/data', homicideRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript Express!' });
});

console.log(process.env);
// Start server with banner
startServer(app, port);
