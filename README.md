# Vivid App

A YouTube-like video platform. Express + MongoDB backend, React frontend.

---

## Local Setup

### Backend
```bash
cd backend
cp .env.example .env      # fill in your values
npm install
npm run dev               # runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
cp .env.example .env      # set VITE_API_BASE_URL
npm install
npm run dev               # runs on http://localhost:5173
```

---

## Required Services (all free tier)

| Service | Purpose | Link |
|---|---|---|
| MongoDB Atlas | Database | https://cloud.mongodb.com |
| Cloudinary | Video & image storage | https://cloudinary.com |
| Render | Backend hosting | https://render.com |
| Netlify | Frontend hosting | https://netlify.com |

---

## Deployment

### 1. MongoDB Atlas
1. Create a free M0 cluster
2. Add a database user (username + password)
3. Whitelist `0.0.0.0/0` under Network Access
4. Copy the connection string → paste into `MONGODB_URI` in your backend env

### 2. Cloudinary
1. Sign up for free
2. Copy Cloud Name, API Key, API Secret from the dashboard
3. Paste into backend env vars

### 3. Backend → Render (free tier)
1. Push your code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your repo, set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all env vars from `.env.example` under Environment
7. Copy the deployed URL (e.g. `https://vivid-api.onrender.com`)

### 4. Frontend → Netlify (free tier)
1. Go to https://netlify.com → Add new site → Import from Git
2. Set base directory to `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Under Site Settings → Environment Variables, add:
   ```
   VITE_API_BASE_URL=https://vivid-api.onrender.com/api/v1
   ```
6. Deploy — the `public/_redirects` file handles React Router refresh

### 5. Update CORS
Once frontend is deployed, go back to Render and update:
```
CORS_ORIGIN=https://your-site.netlify.app
```

---

## Env Variables Reference

### Backend
| Variable | Description |
|---|---|
| `PORT` | Server port (Render sets this automatically) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CORS_ORIGIN` | Frontend URL (Netlify URL in production) |
| `ACCESS_TOKEN_SECRET` | Strong random string for JWT |
| `ACCESS_TOKEN_EXPIRY` | e.g. `1d` |
| `REFRESH_TOKEN_SECRET` | Strong random string for refresh JWT |
| `REFRESH_TOKEN_EXPIRY` | e.g. `10d` |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |

### Frontend
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL |
