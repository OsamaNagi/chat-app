# Reachable - Real-time Chat Application

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO.

## Features

- 🔐 User authentication (signup/login)
- 👤 User profiles with avatar support
- 💬 Real-time messaging
- 🖼️ Image sharing in chats
- 🎨 Theme customization
- 🟢 Online/offline user status
- 📱 Responsive design
- 🔒 Secure authentication with JWT
- ☁️ Cloud image storage with Cloudinary

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- DaisyUI
- Zustand for state management
- Socket.IO client
- Axios for API calls
- React Router for navigation
- React Hot Toast for notifications

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Cloudinary for image storage
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

### Building for Production

```bash
# From root directory
npm run build
```

This will:

1. Install dependencies for both frontend and backend
2. Build the frontend
3. Prepare the application for production deployment

To start the production server:

```bash
npm start
```

## Features in Detail

### Authentication

- Secure user registration and login
- JWT-based authentication with HTTP-only cookies
- Password hashing using bcrypt

### Real-time Chat

- Instant message delivery using Socket.IO
- Image sharing with preview
- Online/offline status indicators
- Message timestamps
- Chat history preservation

### User Profile

- Customizable user avatars
- Cloud storage for profile pictures
- User information management

### Themes

- Multiple theme options using DaisyUI
- Persistent theme selection
- Live theme preview

## Project Structure
