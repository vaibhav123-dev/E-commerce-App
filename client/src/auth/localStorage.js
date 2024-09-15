export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const saveRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("refreshToken");
};
