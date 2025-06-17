import axios from "axios";

export const BASE_URL = "http://34.64.218.29:8080";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`; // ✅ 여기서 붙여줌!
  }
  return config;
});
