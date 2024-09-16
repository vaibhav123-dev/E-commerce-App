import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { getRefreshToken, saveRefreshToken } from "../auth/localStorage";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../redux/slices/authSlice.js";
import Footer from "../components/Footer/Footer.jsx";
import { postRequest } from "../auth/apiRequest.js";

export const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await postRequest("/user/refresh-token", { refreshToken: refreshToken })
        .then(({ data }) => {
          dispatch(setAccessToken(data?.accessToken));
          saveRefreshToken(data?.refreshToken);
        })
        .catch(() => {
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
