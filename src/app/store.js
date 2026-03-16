import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uiReducer from "./uiSlice";
import spinnerReducer from "./spinnerSlice";
import notificationReducer from "./notificationSlice";
import cartReducer from "./cartSlice";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    ui: uiReducer,
    spinnerSlice: spinnerReducer,
    notification: notificationReducer,
    cart: cartReducer,
    movies: moviesReducer,

  },
});
