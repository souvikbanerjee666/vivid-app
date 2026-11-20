import { useState, useEffect } from "react";
import { watchHistoryAPI } from "../services/api";
import VideoCard from "../components/VideoCard";

export default function WatchHistory() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    watchHistoryAPI.get()
      .then((res) => setVideos(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h2 className="section-title">Watch History</h2>
      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="center-msg">No watch history yet.</div>
      ) : (
        <div className="video-grid">
          {videos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}
    </div>
  );
}
