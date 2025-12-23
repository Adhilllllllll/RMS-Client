import { createSlice } from "@reduxjs/toolkit";

const advisorSlice = createSlice({
  name: "advisor",
  initialState: {
    profile: null,
    students: [],
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdvisorState: (state) => {
      state.profile = null;
      state.students = [];
      state.reviews = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: () => {
    // Async thunks will be added later
  },
});

export const { clearAdvisorState } = advisorSlice.actions;
export default advisorSlice.reducer;
