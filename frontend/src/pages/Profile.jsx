import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { videoAPI, authAPI } from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Profile() {
  const { user, login } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    videoAPI.getAll({ userId: user._id, sortBy: "createdAt", sortType: "desc" })
      .then((res) => setVideos(res.data.data.docs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user._id]);

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;
    setUpdating("avatar");
    try {
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      await authAPI.updateAvatar(fd);
      const res = await authAPI.getCurrentUser();
      window.location.reload();
    } finally {
      setUpdating("");
    }
  };

  const handleCoverUpdate = async (e) => {
    e.preventDefault();
    if (!coverFile) return;
    setUpdating("cover");
    try {
      const fd = new FormData();
      fd.append("coverImage", coverFile);
      await authAPI.updateCoverImage(fd);
      window.location.reload();
    } finally {
      setUpdating("");
    }
  };

  const handleDelete = async (videoId) => {
    if (!confirm("Delete this video?")) return;
    await videoAPI.delete(videoId);
    setVideos(videos.filter((v) => v._id !== videoId));
  };

  return (
    <div className="page">
      <div className="profile-cover">
        {user.coverImage
          ? <img src={user.coverImage} alt="cover" className="cover-img" />
          : <div className="cover-placeholder" />}
      </div>

      <div className="profile-header">
        <img src={user.avatar} alt={user.username} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.fullName}</h2>
          <p className="muted">@{user.username}</p>
          <p className="muted">{user.email}</p>
        </div>
      </div>

      <div className="profile-edit">
        <form onSubmit={handleAvatarUpdate} className="edit-row">
          <label className="file-label">
            Change Avatar
            <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
          </label>
          <button type="submit" className="btn-outline" disabled={updating === "avatar"}>
            {updating === "avatar" ? "Updating..." : "Update"}
          </button>
        </form>
        <form onSubmit={handleCoverUpdate} className="edit-row">
          <label className="file-label">
            Change Cover Image
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
          </label>
          <button type="submit" className="btn-outline" disabled={updating === "cover"}>
            {updating === "cover" ? "Updating..." : "Update"}
          </button>
        </form>
      </div>

      <h3 className="section-title">Your Videos</h3>
      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="center-msg">No videos yet. <a href="/upload">Upload one!</a></div>
      ) : (
        <div className="video-grid">
          {videos.map((v) => (
            <div key={v._id} className="video-card-wrap">
              <VideoCard video={v} />
              <button onClick={() => handleDelete(v._id)} className="btn-delete-video">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
