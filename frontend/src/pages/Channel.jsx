import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authAPI, videoAPI, subscriptionAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

export default function Channel() {
  const { username } = useParams();
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authAPI.getChannel(username)
      .then((res) => {
        const ch = res.data.data;
        setChannel(ch);
        setSubscribed(ch.isSubscribed);
        return videoAPI.getAll({ userId: ch._id, sortBy: "createdAt", sortType: "desc" });
      })
      .then((res) => setVideos(res.data.data.docs || []))
      .catch((err) => setError(err.response?.data?.message || "Channel not found"))
      .finally(() => setLoading(false));
  }, [username]);

  const handleSubscribe = async () => {
    await subscriptionAPI.toggle(channel._id);
    setSubscribed(!subscribed);
    setChannel({ ...channel, subscribersCount: subscribed ? channel.subscribersCount - 1 : channel.subscribersCount + 1 });
  };

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  return (
    <div className="page">
      <div className="profile-cover">
        {channel.coverImage
          ? <img src={channel.coverImage} alt="cover" className="cover-img" />
          : <div className="cover-placeholder" />}
      </div>

      <div className="profile-header">
        <img src={channel.avatar} alt={channel.username} className="profile-avatar" />
        <div className="profile-info">
          <h2>{channel.fullName}</h2>
          <p className="muted">@{channel.username}</p>
          <p className="muted">{channel.subscribersCount} subscribers · {channel.channelsSubscribedToCount} subscribed</p>
        </div>
        {user.username !== channel.username && (
          <button onClick={handleSubscribe} className={subscribed ? "btn-outline" : "btn-primary"}>
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      <h3 className="section-title">Videos</h3>
      {videos.length === 0 ? (
        <div className="center-msg">No videos yet.</div>
      ) : (
        <div className="video-grid">
          {videos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}
    </div>
  );
}
