import axios from "axios";

export const baseURL = "https://test.imanglobal.net";

const api = axios.create({
  baseURL: `${baseURL}/api`, // reuse the baseURL here
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
