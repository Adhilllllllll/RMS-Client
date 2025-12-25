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
   REFRESH USER THUNK (fetch latest profile on app load)
====================== */
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const role = state.auth.user?.role;

      // Call appropriate profile endpoint based on role
      let endpoint = null;
      if (role === "advisor") {
        endpoint = "/advisor/me";
      } else if (role === "reviewer") {
        endpoint = "/reviews/reviewer/profile";
      } else if (role === "admin") {
        endpoint = "/admin/me";
      } else if (role === "student") {
        // Students don't have a profile refresh endpoint yet
        // Just return current user data
        return thunkAPI.getState().auth.user;
      }

      if (!endpoint) {
        return thunkAPI.getState().auth.user;
      }

      const res = await api.get(endpoint);
      // Extract user from different response structures
      const user = res.data.advisor || res.data.reviewer || res.data.user || res.data;
      return user;
    } catch (err) {
      // Don't reject - just return current user if refresh fails
      return thunkAPI.getState().auth.user;
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
    // Update user profile in store and localStorage
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
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
      })
      /* ---------- REFRESH USER ---------- */
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = { ...state.user, ...action.payload };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
