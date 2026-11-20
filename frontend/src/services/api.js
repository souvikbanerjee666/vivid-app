import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const authAPI = {
  register: (formData) => api.post("/users/register", formData),
  login: (data) => api.post("/users/login", data),
  logout: () => api.post("/users/logout"),
  getCurrentUser: () => api.get("/users/current-user"),
  getChannel: (username) => api.get(`/users/c/${username}`),
  updateAvatar: (formData) => api.patch("/users/avatar", formData),
  updateCoverImage: (formData) => api.patch("/users/cover-image", formData),
};

export const videoAPI = {
  getAll: (params) => api.get("/videos", { params }),
  getById: (id) => api.get(`/videos/${id}`),
  upload: (formData) => api.post("/videos", formData),
  delete: (id) => api.delete(`/videos/${id}`),
  togglePublish: (id) => api.patch(`/videos/toggle/publish/${id}`),
};

export const likeAPI = {
  toggleVideoLike: (videoId) => api.post(`/likes/toggle/v/${videoId}`),
  getLikedVideos: () => api.get("/likes/videos"),
};

export const commentAPI = {
  getComments: (videoId, params) => api.get(`/comments/${videoId}`, { params }),
  addComment: (videoId, content) => api.post(`/comments/${videoId}`, { content }),
  deleteComment: (commentId) => api.delete(`/comments/c/${commentId}`),
};

export const subscriptionAPI = {
  toggle: (channelId) => api.post(`/subscriptions/c/${channelId}`),
  getSubscribed: (subscriberId) => api.get(`/subscriptions/u/${subscriberId}`),
};

export const tweetAPI = {
  create: (content) => api.post("/tweets", { content }),
  getUserTweets: (userId) => api.get(`/tweets/user/${userId}`),
  update: (tweetId, content) => api.patch(`/tweets/${tweetId}`, { content }),
  delete: (tweetId) => api.delete(`/tweets/${tweetId}`),
  toggleLike: (tweetId) => api.post(`/likes/toggle/t/${tweetId}`),
};

export default api;
