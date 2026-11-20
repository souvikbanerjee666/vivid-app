import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { playlistAPI } from "../services/api";
import { Link } from "react-router-dom";

export default function Playlists() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    playlistAPI.getUserPlaylists(user._id)
      .then((res) => setPlaylists(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user._id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) return setError("Name and description required");
    setError("");
    setCreating(true);
    try {
      const res = await playlistAPI.create(form);
      setPlaylists([{ ...res.data.data, totalVideos: 0 }, ...playlists]);
      setForm({ name: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create playlist");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (playlistId) => {
    if (!confirm("Delete this playlist?")) return;
    await playlistAPI.delete(playlistId);
    setPlaylists(playlists.filter((p) => p._id !== playlistId));
  };

  return (
    <div className="page">
      <h2 className="section-title">Playlists</h2>

      <form onSubmit={handleCreate} className="playlist-form">
        <h3>Create Playlist</h3>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit" className="btn-primary" disabled={creating}>{creating ? "Creating..." : "Create"}</button>
      </form>

      {loading ? (
        <div className="center-msg">Loading...</div>
      ) : playlists.length === 0 ? (
        <div className="center-msg">No playlists yet.</div>
      ) : (
        <div className="playlists-grid">
          {playlists.map((p) => (
            <div key={p._id} className="playlist-card">
              <div className="playlist-thumb">
                {p.firstVideo?.thumbnail
                  ? <img src={p.firstVideo.thumbnail} alt={p.name} />
                  : <div className="playlist-thumb-empty">🎵</div>}
                <span className="playlist-count">{p.totalVideos} videos</span>
              </div>
              <div className="playlist-info">
                <p className="playlist-name">{p.name}</p>
                <p className="playlist-desc">{p.description}</p>
              </div>
              <div className="playlist-actions">
                <Link to={`/playlist/${p._id}`} className="btn-outline btn-sm">View</Link>
                <button onClick={() => handleDelete(p._id)} className="btn-delete">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
