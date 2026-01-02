# Premium E-Library

A modern e-library application with a React frontend and Express backend.

## Project Structure

This is a monorepo with two main directories:

- **frontend/** - React + Vite SPA application
- **backend/** - Express.js API with MongoDB

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- Lucide React Icons

### Backend
- Express.js
- MongoDB (Mongoose)
- CORS
- dotenv

## Deployment

### Frontend on Vercel

This project includes a `vercel.json` configuration file that handles:

1. Building from the `frontend` directory
2. SPA routing fallback (all routes serve index.html)
3. Proper output directory configuration

The configuration ensures that:
- The root URL (/) loads the Home page
- Client-side routing works correctly on refresh
- All React Router paths are handled properly

#### Vercel Configuration

The `vercel.json` file configures:
- Build command: Installs dependencies in frontend/ and runs `npm run build`
- Output directory: `frontend/dist`
- SPA rewrites: All routes fallback to `/index.html` for React Router

#### Important Notes

1. **Root Directory**: When deploying to Vercel, set the Root Directory to the project root (not to `frontend/`)

2. **Environment Variables**: Add these to Vercel environment variables:
   - `VITE_API_URL`: Your deployed backend API URL (e.g., `https://your-backend.vercel.app`)
   - For the backend deployment (separate), set `MONGODB_URI` with your MongoDB Atlas connection string

3. **Backend API**: The backend needs to be deployed separately (e.g., Railway, Render, or Vercel Serverless Functions). Make sure to set the `MONGODB_URI` environment variable for the backend with your MongoDB Atlas connection string (including the database name "elibrary").

4. **Frontend Configuration**: Update `VITE_API_URL` in your deployment to point to your deployed backend URL

### Backend Deployment Options

The backend can be deployed to:
- Vercel Serverless Functions (requires restructuring)
- Railway
- Render
- Heroku
- Any Node.js hosting platform

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas cloud database (recommended)

### Setup

1. Clone the repository

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the `backend/` directory (copy from `.env.example`):
```bash
# Required: MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elibrary

# Optional: JWT secret for token signing (defaults to 'secret' in dev)
JWT_SECRET=your-secret-key-here

# Optional: Server port (defaults to 5000)
PORT=5000
```

**Important:** The `MONGODB_URI` must include the database name "elibrary" at the end of the connection string.

5. Create a `.env` file in the `frontend/` directory (copy from `.env.example`):
```bash
# API base URL (for local development)
VITE_API_URL=http://localhost:5000
```

6. Start the backend server:
```bash
cd backend
node server.js
```

7. Start the frontend development server:
```bash
cd frontend
npm run dev
```

8. Open http://localhost:5173 in your browser

### Environment Variables

#### Backend (.env)
- `MONGODB_URI` (required): MongoDB Atlas connection string with database name "elibrary"
- `JWT_SECRET` (optional): Secret key for JWT token signing
- `PORT` (optional): Server port (default: 5000)

#### Frontend (.env)
- `VITE_API_URL` (optional): Backend API URL (default: http://localhost:5000)

### Password Requirements
When registering a new user, passwords must:
- Be at least 8 characters long
- Contain at least one number or special character (e.g., !@#$%^&*)

## Features

### User Features
- Browse and search books
- View book details
- Save books to personal library
- User authentication (login/register)

### Admin Features
- Admin authentication
- Dashboard with overview
- Manage books (add, edit, delete)
- Manage users
- View transactions

## Default Credentials

### Admin
- Email: watson777@gmail.com
- Password: watson777

## License

Proprietary
