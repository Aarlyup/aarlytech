# Aarly - Startup Funding Discovery Platform

A MERN stack application that helps startups discover funding opportunities including VCs, accelerators, incubators, and government grants.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication with HTTP-only cookies
- **Passport.js** for Google OAuth
- **Resend** for email services
- **Cloudinary** for image uploads

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Resend account for emails
- Google OAuth credentials
- Cloudinary account for images

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required variables (see `.env.example`)

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to root directory and install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with required variables (see `.env.example`)

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication Features

- Email/Password registration with OTP verification
- Google OAuth 2.0 integration
- JWT tokens with HTTP-only cookies
- Protected routes
- Password strength validation
- Email verification with Resend

## 📱 Features

- **Funding Discovery**: Browse VCs, accelerators, incubators, and grants
- **Investor Matching**: AI-powered investor recommendations
- **Financial News**: Latest funding and startup news
- **Resource Library**: Templates and guides for fundraising
- **User Dashboard**: Personalized funding journey tracking

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth

### Funding Sources
- `GET /api/accelerators` - Get accelerators
- `GET /api/incubators` - Get incubators
- `GET /api/microvcs` - Get micro VCs

## 🚀 Deployment

### Backend
1. Set production environment variables
2. Deploy to your preferred platform (Heroku, Railway, etc.)
3. Ensure MongoDB connection is configured

### Frontend
1. Update `VITE_API_URL` to production backend URL
2. Build the project: `npm run build`
3. Deploy to Netlify, Vercel, or your preferred platform

## 📄 License

MIT License - see LICENSE file for details
