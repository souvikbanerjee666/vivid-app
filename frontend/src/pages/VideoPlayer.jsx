import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { videoAPI } from "../services/api";

export default function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    videoAPI.getById(videoId)
      .then((res) => setVideo(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load video"))
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  return (
    <div className="player-page">
      <video controls src={video.videoFile} className="video-player" />
      <div className="video-details">
        <h1>{video.title}</h1>
        <div className="video-stats">
          <span>{video.views?.toLocaleString()} views</span>
          <span>👍 {video.likesCount}</span>
        </div>
        <div className="owner-row">
          <img src={video.owner?.avatar} alt={video.owner?.username} className="owner-avatar-lg" />
          <div>
            <p className="owner-name">{video.owner?.fullName}</p>
            <p className="owner-handle">@{video.owner?.username}</p>
          </div>
        </div>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  );
}
