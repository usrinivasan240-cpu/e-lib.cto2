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

2. **Environment Variables**: Add your MongoDB URI as `MONGODB_URI` in Vercel environment variables

3. **Backend API**: The backend needs to be deployed separately (e.g., Railway, Render, or Vercel Serverless Functions) and the API base URL in the frontend should be updated accordingly

4. **Current API URL**: The frontend is configured to use `http://localhost:5000` for development. Update this in:
   - `frontend/src/pages/Home.jsx`
   - Other API calls throughout the frontend

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
- MongoDB (local or cloud instance)

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

4. Create a `.env` file in the `backend/` directory:
```
MONGODB_URI=mongodb://localhost:27017/e-library
PORT=5000
```

5. Start the backend server:
```bash
cd backend
node server.js
```

6. Start the frontend development server:
```bash
cd frontend
npm run dev
```

7. Open http://localhost:5173 in your browser

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
