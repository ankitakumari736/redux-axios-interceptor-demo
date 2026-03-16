
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";
import { usersAxios } from "../api/axiosInstance";

import { API_URLS } from "../api/apiUrls";


// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await usersAxios({
//         method: API_URLS.GET_USERS.method,
//         url: API_URLS.GET_USERS.url,
//       });

//       return response.users;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersAxios({
        method: API_URLS.GET_USERS.method,
        url: API_URLS.GET_USERS.url,
      });

      return response.users;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await usersAxios({
        method: API_URLS.ADD_USER.method,
        url: API_URLS.ADD_USER.url,
        data,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await usersAxios({
        method: API_URLS.DELETE_USER.method,
        url: `${API_URLS.DELETE_USER.url}/${id}`,
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await usersAxios({
        method: API_URLS.UPDATE_USER.method,
        url: `${API_URLS.UPDATE_USER.url}/${id}`,
        data,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchUsers.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.list = action.payload;
      // })
      .addCase(fetchUsers.fulfilled, (state, action) => {
  state.loading = false;
  state.list = action.payload;
})

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (u) => u.id !== action.payload
        );
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
