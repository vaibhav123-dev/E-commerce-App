import axios from 'axios';
import { store } from './redux/store'; // import your redux store
import { setAccessToken } from './redux/authSlice'; // action to update the access token in redux
import { getRefreshToken, saveRefreshToken } from './localStorage'; // helper functions to get and save refresh token
import { toast } from 'sonner';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// Request Interceptor
API.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
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
        const { data } = await axios.post('/refresh-token', { token: refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = data;

        // Save new tokens
        store.dispatch(setAccessToken(accessToken)); // Save accessToken in Redux
        saveRefreshToken(newRefreshToken); // Save refreshToken in localStorage

        // Retry original request with new accessToken
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (err) {
        toast.error('Session expired. Please login again.');
        // Redirect to login or handle as needed
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
