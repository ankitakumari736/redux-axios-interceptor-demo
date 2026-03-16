import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    page: 1,
    loading: false,
  },

  reducers: {

    setMovies: (state, action) => {
      state.list = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }

  }
});

export const { setMovies, setPage, setLoading } =
  moviesSlice.actions;

export default moviesSlice.reducer;
