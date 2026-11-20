import { useState, useEffect } from "react";
import { videoAPI } from "../services/api";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    videoAPI.getAll({ query, sortBy: "createdAt", sortType: "desc" })
      .then((res) => setVideos(res.data.data.docs || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setQuery(search)}
        />
        <button onClick={() => setQuery(search)} className="btn-primary">Search</button>
      </div>

      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="center-msg">No videos found.</div>
      ) : (
        <div className="video-grid">
          {videos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}
    </div>
  );
}
