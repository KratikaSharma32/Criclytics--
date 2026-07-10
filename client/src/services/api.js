import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("criclive_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try one silent refresh before giving up — keeps people logged in
// across the 15-minute access token window without re-entering a password.
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        refreshing = refreshing || api.post("/auth/refresh");
        const { data } = await refreshing;
        refreshing = null;
        localStorage.setItem("criclive_token", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        refreshing = null;
        localStorage.removeItem("criclive_token");
        localStorage.removeItem("criclive_user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
