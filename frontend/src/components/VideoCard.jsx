import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const duration = video.duration
    ? `${Math.floor(video.duration / 60)}:${String(Math.floor(video.duration % 60)).padStart(2, "0")}`
    : null;

  return (
    <Link to={`/video/${video._id}`} className="video-card">
      <div className="thumbnail-wrap">
        <img src={video.thumbnail} alt={video.title} />
        {duration && <span className="duration">{duration}</span>}
      </div>
      <div className="video-info">
        <Link to={`/channel/${video.owner?.username}`} onClick={(e) => e.stopPropagation()}>
          <img src={video.owner?.avatar} alt={video.owner?.username} className="owner-avatar" />
        </Link>
        <div>
          <p className="video-title">{video.title}</p>
          <Link to={`/channel/${video.owner?.username}`} className="video-meta" onClick={(e) => e.stopPropagation()}>
            {video.owner?.fullName}
          </Link>
          <p className="video-meta">{video.views?.toLocaleString()} views</p>
        </div>
      </div>
    </Link>
  );
}
