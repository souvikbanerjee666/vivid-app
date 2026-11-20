import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { videoAPI, likeAPI, commentAPI, subscriptionAPI, playlistAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function VideoPlayer() {
  const { videoId } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);

  useEffect(() => {
    videoAPI.getById(videoId)
      .then((res) => {
        setVideo(res.data.data);
        setLikesCount(res.data.data.likesCount || 0);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load video"))
      .finally(() => setLoading(false));

    commentAPI.getComments(videoId)
      .then((res) => setComments(res.data.data.docs || []))
      .catch(() => {});

    playlistAPI.getUserPlaylists(user._id)
      .then((res) => setPlaylists(res.data.data || []))
      .catch(() => {});
  }, [videoId]);

  const handleAddToPlaylist = async (playlistId) => {
    await playlistAPI.addVideo(videoId, playlistId);
    setShowPlaylists(false);
  };

  const handleLike = async () => {
    const res = await likeAPI.toggleVideoLike(videoId);
    const isLiked = res.data.data.isLiked;
    setLiked(isLiked);
    setLikesCount((c) => isLiked ? c + 1 : c - 1);
  };

  const handleSubscribe = async () => {
    const res = await subscriptionAPI.toggle(video.owner._id);
    setSubscribed(res.data.data.subscribed);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await commentAPI.addComment(videoId, commentText);
      setComments([{ ...res.data.data, owner: { fullName: user.fullName, avatar: user.avatar, username: user.username } }, ...comments]);
      setCommentText("");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await commentAPI.deleteComment(commentId);
    setComments(comments.filter((c) => c._id !== commentId));
  };

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  return (
    <div className="player-page">
      <video controls src={video.videoFile} className="video-player" />

      <div className="video-details">
        <h1>{video.title}</h1>

        <div className="video-actions">
          <div className="video-stats">
            <span>{video.views?.toLocaleString()} views</span>
          </div>
          <button onClick={handleLike} className={`btn-like ${liked ? "liked" : ""}`}>
            👍 {likesCount}
          </button>
          <div className="playlist-save-wrap">
            <button onClick={() => setShowPlaylists(!showPlaylists)} className="btn-outline">+ Playlist</button>
            {showPlaylists && (
              <div className="playlist-dropdown">
                {playlists.length === 0 ? <p>No playlists. <Link to="/playlists">Create one</Link></p> :
                  playlists.map((p) => (
                    <button key={p._id} onClick={() => handleAddToPlaylist(p._id)}>{p.name}</button>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="owner-row">
          <img src={video.owner?.avatar} alt={video.owner?.username} className="owner-avatar-lg" />
          <div className="owner-info">
            <Link to={`/channel/${video.owner?.username}`} className="owner-name">{video.owner?.fullName}</Link>
            <p className="owner-handle">@{video.owner?.username}</p>
          </div>
          {user._id !== video.owner?._id && (
            <button onClick={handleSubscribe} className={subscribed ? "btn-outline" : "btn-primary"}>
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        <p className="video-description">{video.description}</p>
      </div>

      <div className="comments-section">
        <h3>{comments.length} Comments</h3>
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={commentLoading}>Post</button>
        </form>

        <div className="comments-list">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <img src={c.owner?.avatar} alt={c.owner?.username} className="owner-avatar" />
              <div className="comment-body">
                <p className="comment-author">{c.owner?.fullName}</p>
                <p className="comment-text">{c.content}</p>
              </div>
              {c.owner?.username === user.username && (
                <button onClick={() => handleDeleteComment(c._id)} className="btn-delete">🗑</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
