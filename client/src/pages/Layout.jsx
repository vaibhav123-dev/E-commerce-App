import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import API from "./../auth/axiosIntercept";
import { getRefreshToken } from "../auth/localStorage";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/slices/authSlice.js";

export const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export const PrivateRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      // Try to refresh the accessToken
      API.post("/refresh-token", { token: refreshToken })
        .then(({ data }) => {
          dispatch(setAccessToken(data.accessToken));
        })
        .catch(() => {
          // Handle error (e.g., redirect to login if refresh fails)
          window.location.href = "/login";
        });
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
