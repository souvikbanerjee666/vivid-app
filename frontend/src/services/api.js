import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const authAPI = {
  register: (formData) => api.post("/users/register", formData),
  login: (data) => api.post("/users/login", data),
  logout: () => api.post("/users/logout"),
  getCurrentUser: () => api.get("/users/current-user"),
};

export const videoAPI = {
  getAll: (params) => api.get("/videos", { params }),
  getById: (id) => api.get(`/videos/${id}`),
};

export default api;
