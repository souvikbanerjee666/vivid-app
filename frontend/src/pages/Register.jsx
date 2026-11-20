import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (avatar) fd.append("avatar", avatar);
      if (coverImage) fd.append("coverImage", coverImage);
      await authAPI.register(fd);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Full Name" value={form.fullName} onChange={set("fullName")} required />
        <input type="text" placeholder="Username" value={form.username} onChange={set("username")} required />
        <input type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
        <input type="password" placeholder="Password" value={form.password} onChange={set("password")} required />
        <label className="file-label">
          Avatar <span className="required">*</span>
          <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} required />
        </label>
        <label className="file-label">
          Cover Image <span className="optional">(optional)</span>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </label>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
