import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyAvailability } from "./availabilityApi";

export const fetchMyAvailability = createAsyncThunk(
  "availability/fetchMyAvailability",
  async (_, thunkAPI) => {
    try {
      const res = await getMyAvailability();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load availability"
      );
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default availabilitySlice.reducer;
