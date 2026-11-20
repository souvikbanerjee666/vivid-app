import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { tweetAPI } from "../services/api";

export default function Tweets() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    tweetAPI.getUserTweets(user._id)
      .then((res) => setTweets(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user._id]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      const res = await tweetAPI.create(content);
      setTweets([{ ...res.data.data, owner: { fullName: user.fullName, avatar: user.avatar, username: user.username }, likesCount: 0, isLiked: false }, ...tweets]);
      setContent("");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (tweetId) => {
    const res = await tweetAPI.toggleLike(tweetId);
    const isLiked = res.data.data.isLiked;
    setTweets(tweets.map((t) =>
      t._id === tweetId ? { ...t, isLiked, likesCount: isLiked ? t.likesCount + 1 : t.likesCount - 1 } : t
    ));
  };

  const handleEdit = async (tweetId) => {
    if (!editContent.trim()) return;
    const res = await tweetAPI.update(tweetId, editContent);
    setTweets(tweets.map((t) => t._id === tweetId ? { ...t, content: res.data.data.content } : t));
    setEditId(null);
  };

  const handleDelete = async (tweetId) => {
    await tweetAPI.delete(tweetId);
    setTweets(tweets.filter((t) => t._id !== tweetId));
  };

  return (
    <div className="page">
      <h2 className="section-title">Tweets</h2>

      <form onSubmit={handlePost} className="tweet-form">
        <img src={user.avatar} alt={user.username} className="owner-avatar" />
        <div className="tweet-input-wrap">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
          />
          <button type="submit" className="btn-primary" disabled={posting}>
            {posting ? "Posting..." : "Tweet"}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : tweets.length === 0 ? (
        <div className="center-msg">No tweets yet. Post your first one!</div>
      ) : (
        <div className="tweets-list">
          {tweets.map((t) => (
            <div key={t._id} className="tweet-card">
              <img src={t.owner?.avatar} alt={t.owner?.username} className="owner-avatar" />
              <div className="tweet-body">
                <div className="tweet-header">
                  <span className="tweet-author">{t.owner?.fullName}</span>
                  <span className="tweet-handle">@{t.owner?.username}</span>
                </div>

                {editId === t._id ? (
                  <div className="tweet-edit">
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={2} />
                    <div className="tweet-edit-actions">
                      <button onClick={() => handleEdit(t._id)} className="btn-primary">Save</button>
                      <button onClick={() => setEditId(null)} className="btn-outline">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="tweet-content">{t.content}</p>
                )}

                <div className="tweet-actions">
                  <button onClick={() => handleLike(t._id)} className={`btn-like ${t.isLiked ? "liked" : ""}`}>
                    👍 {t.likesCount}
                  </button>
                  {t.owner?.username === user.username && (
                    <>
                      <button onClick={() => { setEditId(t._id); setEditContent(t.content); }} className="btn-outline btn-sm">Edit</button>
                      <button onClick={() => handleDelete(t._id)} className="btn-delete">🗑</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
