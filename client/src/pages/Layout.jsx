import { Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
          navigate("/login");
        });
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
