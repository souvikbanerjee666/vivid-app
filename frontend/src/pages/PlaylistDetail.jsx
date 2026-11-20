import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { playlistAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

export default function PlaylistDetail() {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    playlistAPI.getById(playlistId)
      .then((res) => setPlaylist(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load playlist"))
      .finally(() => setLoading(false));
  }, [playlistId]);

  const handleRemove = async (videoId) => {
    await playlistAPI.removeVideo(videoId, playlistId);
    setPlaylist({ ...playlist, videos: playlist.videos.filter((v) => v._id !== videoId) });
  };

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  const isOwner = playlist.owner?.toString() === user._id?.toString();

  return (
    <div className="page">
      <h2 className="section-title">{playlist.name}</h2>
      <p className="muted" style={{ marginBottom: "1.5rem" }}>{playlist.description}</p>

      {playlist.videos?.length === 0 ? (
        <div className="center-msg">No videos in this playlist.</div>
      ) : (
        <div className="video-grid">
          {playlist.videos?.map((v) => (
            <div key={v._id} className="video-card-wrap">
              <VideoCard video={v} />
              {isOwner && (
                <button onClick={() => handleRemove(v._id)} className="btn-delete-video">Remove</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
