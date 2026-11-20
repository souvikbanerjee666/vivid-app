import { useState, useEffect } from "react";
import { dashboardAPI, videoAPI } from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dashboardAPI.getStats(), dashboardAPI.getVideos()])
      .then(([statsRes, videosRes]) => {
        setStats(statsRes.data.data);
        setVideos(videosRes.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleTogglePublish = async (videoId, current) => {
    await videoAPI.togglePublish(videoId);
    setVideos(videos.map((v) => v._id === videoId ? { ...v, isPublished: !current } : v));
  };

  if (loading) return <div className="center-msg">Loading...</div>;

  return (
    <div className="page">
      <h2 className="section-title">Dashboard</h2>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-value">{stats.totalVideos}</p>
            <p className="stat-label">Videos</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{stats.totalSubscribers}</p>
            <p className="stat-label">Subscribers</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{stats.totalViews?.toLocaleString()}</p>
            <p className="stat-label">Total Views</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{stats.totalLikes}</p>
            <p className="stat-label">Total Likes</p>
          </div>
        </div>
      )}

      <h3 className="section-title" style={{ marginTop: "2rem" }}>Your Videos</h3>
      {videos.length === 0 ? (
        <div className="center-msg">No videos yet. <Link to="/upload">Upload one!</Link></div>
      ) : (
        <div className="dashboard-table">
          {videos.map((v) => (
            <div key={v._id} className="dashboard-row">
              <img src={v.thumbnail} alt={v.title} className="dash-thumb" />
              <div className="dash-info">
                <p className="dash-title">{v.title}</p>
                <p className="dash-meta">{v.views?.toLocaleString()} views · {v.likesCount} likes</p>
              </div>
              <div className="dash-actions">
                <span className={`publish-badge ${v.isPublished ? "published" : "unpublished"}`}>
                  {v.isPublished ? "Public" : "Private"}
                </span>
                <button onClick={() => handleTogglePublish(v._id, v.isPublished)} className="btn-outline btn-sm">
                  {v.isPublished ? "Make Private" : "Make Public"}
                </button>
                <Link to={`/video/${v._id}`} className="btn-outline btn-sm">View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
