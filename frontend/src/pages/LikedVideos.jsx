import { useState, useEffect } from "react";
import { likeAPI } from "../services/api";
import VideoCard from "../components/VideoCard";

export default function LikedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    likeAPI.getLikedVideos()
      .then((res) => setVideos(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h2 className="section-title">Liked Videos</h2>
      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="center-msg">No liked videos yet.</div>
      ) : (
        <div className="video-grid">
          {videos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}
    </div>
  );
}
