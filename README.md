# Node.js TypeScript Express API

A RESTful API built with Node.js, Express, TypeScript, and MongoDB. This project provides user authentication functionality with secure password hashing and JWT token-based authentication.

## Features

- 🔐 User Authentication (Signup/Login)
- 📝 TypeScript Support
- 🗄️ MongoDB Integration
- 🔑 JWT Token Authentication
- 🔒 Password Hashing with bcrypt
- ⚡ Fast and Scalable

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd node-vercel
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

This provides:
- Interactive API exploration
- Request/Response examples
- Schema definitions
- Try-out functionality
- Authentication details

## Available Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm run start` - Starts the development server with nodemon
- `npm run start:prod` - Runs the compiled JavaScript in production

## API Endpoints

### Authentication
- `POST /api/users/signup` - Register a new user
- `POST /api/users/login` - Login user

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API routes
└── index.ts        # Application entry point
```

## Technologies Used

- Express.js - Web framework
- TypeScript - Programming language
- MongoDB - Database
- Mongoose - MongoDB ODM
- JWT - Authentication
- bcrypt - Password hashing
- dotenv - Environment variables

## Deployment

This project is configured for deployment on Vercel.

## License

ISC 