import axios from "axios";

const api = axios.create({
  baseURL: "https://foodflow-uw8o.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//check for token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
