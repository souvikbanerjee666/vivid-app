import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import UploadVideo from "./pages/UploadVideo";
import Profile from "./pages/Profile";
import Tweets from "./pages/Tweets";
import Dashboard from "./pages/Dashboard";
import WatchHistory from "./pages/WatchHistory";
import LikedVideos from "./pages/LikedVideos";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import Channel from "./pages/Channel";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="center-msg">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/video/:videoId" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadVideo /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tweets" element={<ProtectedRoute><Tweets /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><WatchHistory /></ProtectedRoute>} />
        <Route path="/liked" element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
        <Route path="/playlists" element={<ProtectedRoute><Playlists /></ProtectedRoute>} />
        <Route path="/playlist/:playlistId" element={<ProtectedRoute><PlaylistDetail /></ProtectedRoute>} />
        <Route path="/channel/:username" element={<ProtectedRoute><Channel /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
