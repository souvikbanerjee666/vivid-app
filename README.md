# Vivid App

A full stack video sharing app I built to learn how backend and frontend work together. Think YouTube but way simpler. You can upload videos, like, comment, subscribe to channels, create playlists, post tweets and more.

**Live:** https://vividapp666.netlify.app  
**Backend:** https://vivid-app.onrender.com

---

## Tech Stack

- **Frontend** — React, React Router, Axios
- **Backend** — Node.js, Express
- **Database** — MongoDB Atlas + Mongoose
- **File Storage** — Cloudinary (videos + images)
- **Hosting** — Render (backend), Netlify (frontend)

---

## Features

- Register / Login / Logout
- Upload videos with thumbnail
- Like videos, comments and tweets
- Comment on videos
- Subscribe to channels
- Create and manage playlists
- Post tweets
- Watch history
- Channel pages
- Dashboard with stats (views, likes, subscribers)

---

## Running locally

### Backend
```bash
cd backend
npm install
# create a .env file and fill in the values (see below)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# create a .env file with VITE_API_BASE_URL=http://localhost:8000/api/v1
npm run dev
```

---

## Env variables

### Backend `.env`
```
PORT=8000
MONGODB_URI=your_mongodb_atlas_uri
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```
