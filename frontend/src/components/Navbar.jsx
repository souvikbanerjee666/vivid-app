import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 Vivid</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/upload" className="btn-primary">+ Upload</Link>
            <Link to="/tweets" className="btn-outline">Tweets</Link>
            <Link to="/dashboard" className="btn-outline">Dashboard</Link>
            <div className="nav-menu-wrap">
              <button className="nav-avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <img src={user.avatar} alt={user.username} className="nav-avatar" />
              </button>
              {menuOpen && (
                <div className="nav-dropdown" onClick={() => setMenuOpen(false)}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/playlists">Playlists</Link>
                  <Link to="/liked">Liked Videos</Link>
                  <Link to="/history">Watch History</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
