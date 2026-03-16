import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState: {
    showSpinner: false,
  },
  reducers: {
    showSpinner: (state) => {
      state.showSpinner = true;
    },
    hideSpinner: (state) => {
      state.showSpinner = false;
    },
  },
});

export const { showSpinner, hideSpinner } =
  spinnerSlice.actions;

export default spinnerSlice.reducer;
