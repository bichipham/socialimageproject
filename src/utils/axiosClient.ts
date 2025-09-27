import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://dummyjson.com/", // backend
  //withCredentials: true,
});

// Add access token
instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token when expired
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const res = await axios.post(
          'https://dummyjson.com/auth/refresh',
          { refreshToken },
          { withCredentials: true }
        );
        const { accessToken } = res.data;
        Cookies.set("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
