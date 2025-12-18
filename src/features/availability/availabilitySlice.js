import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyAvailability,
  createAvailability,
  deleteAvailability,
} from "./availabilityApi";

 
//FETCH

export const fetchMyAvailability = createAsyncThunk(
  "availability/fetchMyAvailability",
  async (_, thunkAPI) => {
    try {
      const res = await getMyAvailability();
      return res?.data ?? [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to load availability"
      );
    }
  }
);


//ADD

export const addAvailability = createAsyncThunk(
  "availability/addAvailability",
  async (data, thunkAPI) => {
    try {
      const res = await createAvailability(data);

      // Backend returns: { message, availability }
      return res.data.availability;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to add availability"
      );
    }
  }
);


//REMOVE

export const removeAvailability = createAsyncThunk(
  "availability/removeAvailability",
  async (id, thunkAPI) => {
    try {
      await deleteAvailability(id);
      return id;  
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to delete availability"
      );
    }
  }
);


//SLICE

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
      /* ---------- FETCH ---------- */
      .addCase(fetchMyAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchMyAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ADD ---------- */
      .addCase(addAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // 🔥 instant UI update
        state.error = null;
      })
      .addCase(addAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(removeAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (slot) => slot._id !== action.payload
        );
        state.error = null;
      })
      .addCase(removeAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default availabilitySlice.reducer;
