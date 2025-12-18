import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ======================
   LOGIN THUNK
====================== */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ======================
   INITIAL STATE
====================== */
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const isValidToken =
  tokenFromStorage &&
  tokenFromStorage !== "undefined" &&
  tokenFromStorage !== "null";

const initialState = {
  token: isValidToken ? tokenFromStorage : null,
  user: userFromStorage && userFromStorage !== "undefined" ? JSON.parse(userFromStorage) : null,
  isAuthenticated: !!isValidToken,
  loading: false,
  error: null,
};

/* ======================
   SLICE
====================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
