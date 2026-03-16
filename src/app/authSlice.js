import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: null,
    email: null,
    isLoggedIn: false,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
