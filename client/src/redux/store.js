import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import userReducer from "./slices/userSlice.js";
import productsReducer from "./slices/productSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
