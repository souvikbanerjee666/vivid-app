import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { videoAPI } from "../services/api";

export default function UploadVideo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnail) return setError("Video file and thumbnail are required");
    setError("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("videoFile", videoFile);
      fd.append("thumbnail", thumbnail);
      const res = await videoAPI.upload(fd);
      navigate(`/video/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form upload-form" onSubmit={handleSubmit}>
        <h2>Upload Video</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />
        <label className="file-label">
          Video File <span className="required">*</span>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
        </label>
        <label className="file-label">
          Thumbnail <span className="required">*</span>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />
        </label>
        {loading && <p className="muted-msg">Uploading... this may take a while ⏳</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Publish Video"}
        </button>
      </form>
    </div>
  );
}
