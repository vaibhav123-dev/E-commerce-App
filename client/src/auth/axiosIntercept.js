import axios from "axios";
import { getRefreshToken, saveRefreshToken } from "./localStorage";
import store from "./../redux/store";
import { setAccessToken } from "../redux/slices/authSlice";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and retry hasn't been attempted yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken(); // Retrieve refreshToken from localStorage

      // Hit refresh token endpoint to get a new accessToken
      try {
        const { data } = await axios.post("/user/refresh-token", {
          refreshToken: refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = data;

        // Save new tokens
        store.dispatch(setAccessToken(accessToken)); // Save accessToken in Redux
        saveRefreshToken(newRefreshToken); // Save refreshToken in localStorage

        // Retry original request with new accessToken
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
